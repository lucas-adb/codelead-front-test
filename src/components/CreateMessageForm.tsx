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
import { Textarea } from './ui/textarea';
import { useMessages } from '@/hooks/queries/useMessages';
import userStore from '@/stores/user-store';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must contain at least 2 character(s)' })
    .max(50, { message: 'Title must be at most 50 characters long' }),
  content: z
    .string()
    .min(2, { message: 'Content must contain at least 2 character(s)' })
    .max(500, { message: 'Content must be at most 500 characters long' }),
});

function CreateMessageForm() {
  const { createMessage } = useMessages();
  const { username } = userStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const title = form.watch('title');
  const content = form.watch('content');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (!username) {
      console.error('Username is not set');
      return;
    }

    try {
      createMessage({
        username,
        ...values,
      });
    } catch (error) {
      console.error('Error creating message:', error);
    } finally {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-2xl bg-background p-6 flex flex-col items-start justify-start border border-codeleap-gray-2 mb-6"
      >
        <FormDescription className="text-2xl text-black font-bold mb-4">
          What’s on your mind?
        </FormDescription>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full mb-4">
              <FormLabel className="text-base">Title</FormLabel>
              <FormControl>
                <Input placeholder="Hello World" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full mb-4">
              <FormLabel className="text-base">Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Content here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn(
            'self-end font-bold px-8 py-1.5 cursor-pointer rounded-lg',
            title && content
              ? 'bg-codeleap-blue hover:bg-codeleap-blue/80'
              : 'bg-gray-700'
          )}
          disabled={!(title && content)}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}

export default CreateMessageForm;
