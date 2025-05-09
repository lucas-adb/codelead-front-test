'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import userStore from '@/stores/user-store';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must contain at least 2 character(s)' })
    .max(50, { message: 'Username must be at most 50 characters long' }),
});

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const { setUsername } = userStore();
  const username = form.watch('username');

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // send request; save username to local storage; redirect to feed
    console.log(values);
    setUsername(values.username);
    router.push('/feed');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 min-w-auto md:min-w-[500px] rounded-2xl bg-background p-6 flex flex-col items-start justify-start shadow-md"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full mb-4">
              <FormDescription className="text-2xl text-black font-bold mb-4">
                Welcome to CodeLeap network!
              </FormDescription>
              <FormLabel className="text-base">
                Please enter your username
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn(
            'self-end font-bold px-8 py-1.5 cursor-pointer rounded-lg',
            username
              ? 'bg-codeleap-blue hover:bg-codeleap-blue/80'
              : 'bg-gray-700'
          )}
          disabled={!username}
        >
          ENTER
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
