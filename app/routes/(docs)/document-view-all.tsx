import {
  Await,
  createFileRoute,
  Link,
  useNavigate,
} from '@tanstack/react-router';
import { Suspense, useMemo } from 'react';
import { z } from 'zod';
import generateToken from '~/utils/auth';
import { getCaseList } from '~/utils/case-service';
import getDocuments from '~/utils/document-service';
import { DataTable } from './-components/data-table';

const documentViewSchema = z.object({
  jobNumber: z.number().catch(2000000),
});
type DocumentView = z.infer<typeof documentViewSchema>;

export const Route = createFileRoute('/(docs)/document-view-all')({
  validateSearch: documentViewSchema,
  loaderDeps: ({ search: { jobNumber } }) => ({ jobNumber }),

  loader: async ({ deps: { jobNumber } }) => {
    console.log('loader2');

    let t = await generateToken();
    let p = getDocuments({ token: t, jobNumber: jobNumber });
    let cases = await getCaseList({
      token: t,
      props: {
        filter: { searchText: '' },
        pagination: { itemsPerPage: 2, page: 1 },
        sortParameters: { field: 'eta', order: 'desc' },
      },
    });
    console.log(cases);
    return { docs: p, cases };
  },
  component: RouteComponent,
});
//document-view-all?jobNumber=200000490
function RouteComponent() {
  const { jobNumber } = Route.useSearch();
  const { docs, cases } = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });
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
        <Suspense fallback={<div>Loading...</div>}>
          <Await promise={docs}>
            {(p) =>
              p.map((d) => (
                <div key={d.documentId}>
                  <span className="bg-slate-500 px-3 py-1 rounded-t-lg inline-block">
                    {d.title}
                  </span>
                  {d.currentVersion.pages.map((p) => (
                    <div
                      key={p.pageId}
                      className="p-2 flex justify-center  align-middle bg-slate-200"
                    >
                      <img
                        src={p.url}
                        alt="Page image"
                        width={200}
                        className="rotate-z-0   bg-white p-2 rounded-md"
                      />
                    </div>
                  ))}
                </div>
              ))
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
