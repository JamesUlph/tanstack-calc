import { useFormContext } from 'react-hook-form';
import { ResolveError } from './resolve-error';

export default function ResolveInput({ name }: { name: string }) {
  const { register, formState } = useFormContext();
  return (
    <>
      <div className="flex-col flex">
        <div>{name}</div>
        <input
          {...register(name)}
          className="p-2 mb-2 bg-gray-100 text-black rounded focus:ring-indigo-400 focus:ring-3"
        />
        <ResolveError name={name} />
      </div>
    </>
  );
}
