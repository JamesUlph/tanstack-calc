import { createFileRoute } from '@tanstack/react-router';
import {
  useForm,
  useFormContext,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ResolveInput from './-components/resolve-input';
import { ResolveError } from './-components/resolve-error';
import { ResolvePanel } from './-components/resolve-panel';
import { ResolveUnit } from './-components/resolve-unit';

export const Route = createFileRoute('/(quickresolve)/quickresolve')({
  loader: async () => {
    console.log('loader');
    console.log('secret=', process.env.SECRET);

    return {};
  },
  component: RouteComponent,
});
const schema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters long' }),

  agent: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Agent must be at least 3 characters long' }),
  // dateOfBirth: z
  //   .date({
  //     required_error: 'Date of birth is required',
  //     invalid_type_error: 'Invalid date',
  //   })
  //   .max(new Date(), { message: 'Date of birth cannot be in the future' }),
  isAdult: z
    .boolean()
    .optional()
    .refine((val) => val == true, 'You must confirm the details are correct'),
  emailAddress: z.string().email(),
  unitIds: z.string().min(1, 'Unit is required'),
});

type IFormInput = z.infer<typeof schema>;

function RouteComponent() {
  const methods = useForm<IFormInput>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues: { name: '', emailAddress: 'james.ulph@hotmail.co.uk' },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="">
      Hello "/quickresolve"!
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ResolvePanel className="mb-4">
            <div className="grid grid-cols-4 gap-4">
              <ResolveInput name={'name'} />
              <ResolveInput name={'agent'} />
              <ResolveInput name={'bcp'} />
              <ResolveInput name={'emailAddress'} />
              <ResolveUnit
                onUpdate={(e) => {
                  console.log(e);
                  methods.setValue(
                    'unitIds',
                    e.map((g: any) => g.name).join(',')
                  );
                }}
              />
              <ResolveError name={'unitIds'} />
            </div>
          </ResolvePanel>
          {/* <input {...register('dateOfBirth')} />{' '} */}
          <ResolvePanel className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={'id'}
                {...methods.register('isAdult')}
                className="w-8 h-8 mr-2"
              />
              <label htmlFor="id" className="text-lg">
                I confirm this is great
              </label>
            </div>
            <ResolveError name={'isAdult'} />
          </ResolvePanel>
          <fieldset>
            <legend>Testing</legend>
          </fieldset>{' '}
          <button className="p-2 rounded-md bg-green-600 text-white font-semibold">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
