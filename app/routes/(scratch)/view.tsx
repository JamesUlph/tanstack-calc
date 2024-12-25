import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(scratch)/view')({
  loader: async () => {
    console.log('loader');
    return {};
  },
  gcTime: 0,
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(scratch)/view"!</div>;
}
