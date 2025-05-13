import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const RobotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

const RobotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CodeLeap Network',
  description: 'The CodeLeap coding test!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${RobotoSans.variable} ${RobotoMono.variable} antialiased bg-background-2 h-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
