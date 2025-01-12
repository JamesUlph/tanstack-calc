import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import type { ReactNode } from 'react';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import appCss from '~/styles/output.css?url';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';

export const Route = createRootRoute({
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <div>
          <Link to="/scratch">Scratch</Link>
          <Link to="/document-view-all">Docs</Link>
          <Link to="/quickresolve">Quick</Link>
          <Link to="/chat">Chat</Link>
        </div>
        {children}
        <ScrollRestoration />
        {process.env['NODE_ENV'] != 'production' && (
          <TanStackRouterDevtools position="bottom-right" />
        )}
        <Scripts />
      </body>
    </html>
  );
}
