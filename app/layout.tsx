import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '优质门窗定制专家 - 极至优门窗',
  description: '30年专业制造经验，为您打造高品质、节能环保的门窗解决方案',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        href: '/icon.svg',
      }
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}