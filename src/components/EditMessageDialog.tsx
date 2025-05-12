'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import edit from '@/assets/edit.svg';
import ButtonIcon from './ButtonIcon';
import { Loader2 } from 'lucide-react';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

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

function EditMessageDialog() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const title = form.watch('title');
  const content = form.watch('content');

  function clearForm() {
    form.reset();
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Edited values:', values);
      setOpen(false);
    } catch (error) {
      console.error('Error editing message:', error);
    } finally {
      setIsEditing(false);
      clearForm();
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ButtonIcon src={edit.src} alt="edit-icon" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit item</AlertDialogTitle>
          <AlertDialogDescription className="visually-hidden">
            This action cannot be undone. This will permanently delete your
            message.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                <FormItem>
                  <FormLabel>Content</FormLabel>
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
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isEditing} onClick={clearForm}>Cancel</AlertDialogCancel>
              <Button
                type="submit"
                className={cn(
                  'text-white',
                  'bg-codeleap-green hover:bg-codeleap-green/80'
                )}
                disabled={isEditing || !(title && content)}
              >
                {isEditing ? (
                  <>
                    Saving
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EditMessageDialog;
