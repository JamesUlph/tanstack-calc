import {
  Await,
  createFileRoute,
  Link,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router';
import { Suspense, useMemo, useTransition } from 'react';
import { z } from 'zod';
import { generateToken } from '~/utils/auth';
import { getCaseList } from '~/utils/case-service';
import getDocuments from '~/utils/document-service';
import { DataTable } from './-components/data-table';
import { createServerFn } from '@tanstack/start';
import { DocumentImages } from './-components/document-images';
import { is } from 'valibot';

const documentViewSchema = z.object({
  jobNumber: z.number().catch(2000000),
});
type DocumentView = z.infer<typeof documentViewSchema>;

const plop = createServerFn({ method: 'POST' }).handler(async () => {
  console.log('Running serverside');
  return generateToken();
});

const plop2 = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async (ctx) => {
    console.log('Running serverside');
    let p = getDocuments({
      token: ctx.data.token,
      jobNumber: ctx.data.jobNumber,
    });
    return p;
  });

const plop3 = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async (ctx) => {
    console.log('Running serverside');
    let cases = await getCaseList({
      token: ctx.data.token,
      props: ctx.data.props,
    });
    return cases;
  });

export const Route = createFileRoute('/(docs)/document-view-all')({
  validateSearch: documentViewSchema,
  loaderDeps: ({ search: { jobNumber } }) => ({ jobNumber }),

  loader: async ({ deps: { jobNumber } }) => {
    //'use server';
    console.log('loader2');

    let t = await plop();
    //let t = await generateToken();

    if (t.error) {
      console.error(t.error);
      throw new Error('Failed to get token:', t.error);
    }

    let p = plop2({ data: { token: t.data, jobNumber: jobNumber } });

    let cases = await plop3({
      data: {
        token: t.data,
        props: {
          filter: { searchText: '' },
          pagination: { itemsPerPage: 2, page: 1 },
          sortParameters: { field: 'eta', order: 'desc' },
        },
      },
    });
    // let cases = await plop3({
    //   data: {
    //     token: t.data,
    //     props: {
    //       filter: { searchText: '' },
    //       pagination: { itemsPerPage: 2, page: 1 },
    //       sortParameters: { field: 'eta', order: 'desc' },
    //     },
    //   },
    // });

    // console.log(cases);
    return { docs: p, cases };
  },
  gcTime: 0,
  //preloadGcTime: 0,
  //preloadStaleTime: 0,
  pendingMinMs: 500,
  pendingMs: 500,
  staleTime: 500,
  component: RouteComponent,
});
//document-view-all?jobNumber=200000490
function RouteComponent() {
  const { jobNumber } = Route.useSearch();
  const { docs, cases } = Route.useLoaderData();
  const [isPending] = useTransition();
  const navigate = useNavigate({ from: Route.fullPath });
  let ppp = useRouterState();
  const columns = useMemo(
    () => [
      { header: () => <span>Date</span>, accessorKey: 'caseId' },
      {
        accessorKey: 'case',
        cell: (v: any) => {
          // <Link href=`/document-view-all?jobNumber=2000000` > { v.getValue() }</Link >
          return (
            <Link
              to="/document-view-all"
              preload={false}
              search={(prev) => ({ ...prev, jobNumber: Number(v.getValue()) })}
            >
              {v.getValue()}
            </Link>
          );
        },
      },
      {
        accessorKey: 'reference',
        cell: (v) => {
          return (
            v.getValue() != null && (
              <>
                <span className="bg-red-500 px-2 py-1 text-sm rounded-lg inline-block">
                  {v.getValue()}
                </span>
              </>
            )
          );
        },
      },
      {
        accessorKey: 'type',
        cell: (v) => (
          <span className="bg-orange-700 px-2 py-1 text-sm rounded-lg inline-block">
            {v.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'subType',
        cell: (v) => (
          <span className="bg-red-500 px-2 py-1 text-sm rounded-lg inline-block">
            {v.getValue()}
          </span>
        ),
      },
      { accessorKey: 'caseStatus' },
      { accessorKey: 'eta' },
      { accessorKey: 'description' },
    ],
    []
  );

  return (
    <div>
      Hello "/(docs)/docs"! {JSON.stringify(jobNumber)}
      <DataTable data={cases.results} columns={columns} />
      <div className="flex flex-col  w-[300px] overflow-clip">
        {ppp.isLoading === true && <div>Loading...</div>}
        <Suspense fallback={<div>Loading...</div>}>
          <DocumentImages docsPromise={docs} />
        </Suspense>
      </div>
    </div>
  );
}
