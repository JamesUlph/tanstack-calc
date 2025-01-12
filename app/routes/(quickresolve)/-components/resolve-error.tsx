import { ReactElement, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';

export function ResolveError({
  children,
  name,
}: {
  children?: ReactNode;
  name: string;
}): ReactElement {
  const { register, formState } = useFormContext();
  return (
    <>
      {formState.errors[name] && (
        <div className="bg-red-800 flex w-fit items-center  shadow rounded-md p-2  text-sm  text-white">
          <X className="bg-red-900 h-4 w-4 mr-2" />
          {formState.errors[name]?.message?.toString()}
        </div>
      )}
    </>
  );
}
