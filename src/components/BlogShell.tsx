import Link from 'next/link';

/**
 * Minimal page chrome for the /blogs surface, matching the starter's neutral
 * look. Apps replace this (or route blog pages through their own shell) when
 * their real design lands — the pages only assume `title`, `lede`, children.
 */
export function BlogShell({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="blog-page">
      <nav className="blog-nav">
        <Link href="/">← Basher</Link>
        <Link href="/blogs">Blog</Link>
      </nav>
      <header className="blog-header">
        <h1>{title}</h1>
        {lede && <p className="blog-lede">{lede}</p>}
      </header>
      <main className="blog-main">{children}</main>
    </div>
  );
}
