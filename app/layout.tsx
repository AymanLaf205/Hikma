import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Hikma - حكمة | Daily Islamic Wisdom',
  description: 'Daily wisdom inspired by Islamic teachings and philosophy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" />
      </head>
      <body className="font-cairo">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}