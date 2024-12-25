import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(7)
    .regex(/^[a-zA-Z]+[0-9]+$/, 'Name must be alphabetic')
    .max(8),
});
type IFormInput = z.infer<typeof schema>;
export function ResolveUnit({ onUpdate }: { onUpdate: (v: any) => void }) {
  let [items, setItems] = useState<any[]>([]);
  const methods = useForm<IFormInput>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: { name: '' },
  });
  return (
    <div>
      Unit
      <input
        type="text"
        className="p-2 mb-2 bg-gray-100 text-black rounded focus:ring-indigo-400 focus:ring-3"
        {...methods.register('name')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            methods.handleSubmit((data) => {
              console.log(data);
              let d = [...items, data.name.toUpperCase()];
              setItems([...d]);
              onUpdate && onUpdate(d);
              methods.setValue('name', '');
            })();
          }
        }}
      />
      {JSON.stringify(items)}
      <p> {methods.formState.errors['name']?.message?.toString()}</p>
      {}
    </div>
  );
}
