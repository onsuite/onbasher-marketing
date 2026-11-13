import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Basher — auto-approve Claude Code bash prompts on Mac',
  description:
    'A menu-bar app that answers Claude Code bash prompts in Terminal, VS Code and Cursor. Per-session switches; your Claude Code deny list sets the limits.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
