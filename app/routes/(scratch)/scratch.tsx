import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/(scratch)/scratch')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/(scratch)/scratch"!{' '}
      <Link to={'/view'} search={{ jobNumber: 2000000 }}>
        {'2000000'}
      </Link>
    </div>
  );
}
