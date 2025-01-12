/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as scratchViewImport } from './routes/(scratch)/view'
import { Route as scratchScratchImport } from './routes/(scratch)/scratch'
import { Route as quickresolveQuickresolveImport } from './routes/(quickresolve)/quickresolve'
import { Route as docsDocumentViewAllImport } from './routes/(docs)/document-view-all'
import { Route as chatChatImport } from './routes/(chat)/chat'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const scratchViewRoute = scratchViewImport.update({
  id: '/(scratch)/view',
  path: '/view',
  getParentRoute: () => rootRoute,
} as any)

const scratchScratchRoute = scratchScratchImport.update({
  id: '/(scratch)/scratch',
  path: '/scratch',
  getParentRoute: () => rootRoute,
} as any)

const quickresolveQuickresolveRoute = quickresolveQuickresolveImport.update({
  id: '/(quickresolve)/quickresolve',
  path: '/quickresolve',
  getParentRoute: () => rootRoute,
} as any)

const docsDocumentViewAllRoute = docsDocumentViewAllImport.update({
  id: '/(docs)/document-view-all',
  path: '/document-view-all',
  getParentRoute: () => rootRoute,
} as any)

const chatChatRoute = chatChatImport.update({
  id: '/(chat)/chat',
  path: '/chat',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/(chat)/chat': {
      id: '/(chat)/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof chatChatImport
      parentRoute: typeof rootRoute
    }
    '/(docs)/document-view-all': {
      id: '/(docs)/document-view-all'
      path: '/document-view-all'
      fullPath: '/document-view-all'
      preLoaderRoute: typeof docsDocumentViewAllImport
      parentRoute: typeof rootRoute
    }
    '/(quickresolve)/quickresolve': {
      id: '/(quickresolve)/quickresolve'
      path: '/quickresolve'
      fullPath: '/quickresolve'
      preLoaderRoute: typeof quickresolveQuickresolveImport
      parentRoute: typeof rootRoute
    }
    '/(scratch)/scratch': {
      id: '/(scratch)/scratch'
      path: '/scratch'
      fullPath: '/scratch'
      preLoaderRoute: typeof scratchScratchImport
      parentRoute: typeof rootRoute
    }
    '/(scratch)/view': {
      id: '/(scratch)/view'
      path: '/view'
      fullPath: '/view'
      preLoaderRoute: typeof scratchViewImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof LayoutRoute
  '/chat': typeof chatChatRoute
  '/document-view-all': typeof docsDocumentViewAllRoute
  '/quickresolve': typeof quickresolveQuickresolveRoute
  '/scratch': typeof scratchScratchRoute
  '/view': typeof scratchViewRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutRoute
  '/chat': typeof chatChatRoute
  '/document-view-all': typeof docsDocumentViewAllRoute
  '/quickresolve': typeof quickresolveQuickresolveRoute
  '/scratch': typeof scratchScratchRoute
  '/view': typeof scratchViewRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_layout': typeof LayoutRoute
  '/(chat)/chat': typeof chatChatRoute
  '/(docs)/document-view-all': typeof docsDocumentViewAllRoute
  '/(quickresolve)/quickresolve': typeof quickresolveQuickresolveRoute
  '/(scratch)/scratch': typeof scratchScratchRoute
  '/(scratch)/view': typeof scratchViewRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/chat'
    | '/document-view-all'
    | '/quickresolve'
    | '/scratch'
    | '/view'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/chat'
    | '/document-view-all'
    | '/quickresolve'
    | '/scratch'
    | '/view'
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/(chat)/chat'
    | '/(docs)/document-view-all'
    | '/(quickresolve)/quickresolve'
    | '/(scratch)/scratch'
    | '/(scratch)/view'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LayoutRoute: typeof LayoutRoute
  chatChatRoute: typeof chatChatRoute
  docsDocumentViewAllRoute: typeof docsDocumentViewAllRoute
  quickresolveQuickresolveRoute: typeof quickresolveQuickresolveRoute
  scratchScratchRoute: typeof scratchScratchRoute
  scratchViewRoute: typeof scratchViewRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRoute,
  chatChatRoute: chatChatRoute,
  docsDocumentViewAllRoute: docsDocumentViewAllRoute,
  quickresolveQuickresolveRoute: quickresolveQuickresolveRoute,
  scratchScratchRoute: scratchScratchRoute,
  scratchViewRoute: scratchViewRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout",
        "/(chat)/chat",
        "/(docs)/document-view-all",
        "/(quickresolve)/quickresolve",
        "/(scratch)/scratch",
        "/(scratch)/view"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx"
    },
    "/(chat)/chat": {
      "filePath": "(chat)/chat.tsx"
    },
    "/(docs)/document-view-all": {
      "filePath": "(docs)/document-view-all.tsx"
    },
    "/(quickresolve)/quickresolve": {
      "filePath": "(quickresolve)/quickresolve.tsx"
    },
    "/(scratch)/scratch": {
      "filePath": "(scratch)/scratch.tsx"
    },
    "/(scratch)/view": {
      "filePath": "(scratch)/view.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
