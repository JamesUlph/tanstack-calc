import { createFileRoute, useRouter } from '@tanstack/react-router';
import { getCount, updateCount } from '../functions';

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const state = Route.useLoaderData();
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className="bg-red-500 p-1 rounded-md"
        onClick={() => {
          updateCount({
            data: {
              increment: 2,
            },
          }).then(() => router.invalidate());
        }}
      >
        Add to {state} {state}
      </button>

      <div>Container</div>
    </>
  );
}
