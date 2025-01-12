import { Await } from '@tanstack/react-router';
import { use } from 'react';

export function DocumentImages({ docsPromise }: { docsPromise: Promise<any> }) {
  let p = use(docsPromise);
  return (
    <div>
      <h1>Document Images</h1>
      {/* <Await promise={docsPromise}>
        {(p) => */}
      {p.map((d: any) => (
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
      ))}
      {/* }
      </Await> */}
    </div>
  );
}
