'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import userStore from '@/stores/user-store';
import { useRouter } from 'next/navigation';
import { signIn, signUp, getSession } from '@/lib/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  username: z.string().min(2, { message: 'Username must be at least 2 characters' })
    .max(50, { message: 'Username must be at most 50 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers and underscores' })
    .optional()
    .or(z.literal('')),
});

function LoginForm() {
  const { setUser } = userStore();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const email = form.watch('email');
  const password = form.watch('password');

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
        router.push('/feed');
      }
    };

    checkSession();
  }, [setUser, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isRegistering && !values.username) {
      form.setError('username', { message: 'Username is required for registration' });
      return;
    }

    setIsLoading(true);
    try {
      const { user } = isRegistering 
        ? await signUp(values.email, values.password, values.username)
        : await signIn(values.email, values.password);
      
      if (user) {
        setUser(user);
        router.push('/feed');
      }
    } catch (error) {
      console.error('Error:', error);
      form.setError('root', {
        message: isRegistering 
          ? 'Error creating account. Please try again.'
          : 'Invalid email or password.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 min-w-auto md:min-w-[500px] rounded-2xl bg-background p-6 flex flex-col items-start justify-start shadow-md">
      <div className="w-full mb-4">
        <h2 className="text-2xl text-black font-bold mb-4">
          Welcome to CodeLeap network!
        </h2>
        <p className="text-base mb-4">
          {isRegistering ? 'Create your account' : 'Sign in to your account'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isRegistering && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {form.formState.errors.root && (
            <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
          )}

          <div className="flex flex-col gap-2 pt-4">
            <Button
              type="submit"
              className={cn(
                'font-bold px-8 py-6 cursor-pointer rounded-lg w-full',
                email && password
                  ? 'bg-codeleap-blue hover:bg-codeleap-blue/80'
                  : 'bg-gray-700'
              )}
              disabled={isLoading || !(email && password)}
            >
              {isLoading ? (
                <>
                  {isRegistering ? 'Creating account' : 'Signing in'}
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                isRegistering ? 'Create account' : 'Sign in'
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsRegistering(!isRegistering)}
              disabled={isLoading}
            >
              {isRegistering
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
