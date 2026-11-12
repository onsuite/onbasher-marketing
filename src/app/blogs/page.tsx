import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogShell } from '@/components/BlogShell';
import { SHOW_DRAFTS, collectionUrl, formatDate, getCollections, getPosts, postUrl } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Basher',
  description: 'News and notes from the Basher team.',
  alternates: { canonical: '/blogs' },
};

export default function BlogsIndexPage() {
  const collections = getCollections();
  const recent = getPosts().slice(0, 10);

  return (
    <BlogShell title="The Basher blog" lede="News and notes from the Basher team.">
      {collections.length > 1 && (
        <ul className="blog-collections">
          {collections.map((c) => (
            <li key={c.key}>
              <Link href={collectionUrl(c)}>
                <strong>{c.name}</strong>
                <span>{c.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {recent.length === 0 ? (
        <p>Nothing published yet.</p>
      ) : (
        <ul className="blog-list">
          {recent.map((p) => (
            <li key={`${p.collection}/${p.slug}`}>
              <Link href={postUrl(p.collection, p.slug)}>
                <strong>{p.frontmatter.title}</strong>
                <p>{p.frontmatter.description}</p>
                <span className="blog-meta">
                  {formatDate(p.frontmatter.date_published ?? p.frontmatter.date_created)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {SHOW_DRAFTS && (
        <p className="blog-meta">
          Review mode: <Link href="/blogs/drafts">see the draft queue →</Link>
        </p>
      )}
    </BlogShell>
  );
}
