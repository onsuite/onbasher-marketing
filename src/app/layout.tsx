import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Basher — the OnSuite reference starter app',
  description:
    'Basher is the reference starter app for the OnSuite platform — demonstrating authentication, SSO, and workspace management.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
