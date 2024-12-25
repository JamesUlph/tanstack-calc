import { ReactElement, ReactNode } from 'react';

export function ResolvePanel({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}): ReactElement {
  return <div className="bg-slate-800 p-2  rounded-md">{children}</div>;
}
