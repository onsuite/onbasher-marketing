import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogShell } from '@/components/BlogShell';
import { SHOW_DRAFTS, formatDate, getPosts, postUrl } from '@/lib/blog';

/**
 * The reviewer's queue: every unpublished post, in one place, linked into the
 * real theme. Exists only in dev/preview — production 404s.
 */

export const metadata: Metadata = {
  title: 'Draft queue — Basher',
  robots: { index: false, follow: false },
};

export default function DraftsPage() {
  if (!SHOW_DRAFTS) notFound();

  const drafts = getPosts({ includeDrafts: true }).filter(
    (p) => p.frontmatter.status !== 'published',
  );

  return (
    <BlogShell title="Draft queue" lede="Every unpublished post. Visible in dev and preview builds only.">
      {drafts.length === 0 ? (
        <p>No drafts waiting.</p>
      ) : (
        <ul className="blog-list">
          {drafts.map((p) => (
            <li key={`${p.collection}/${p.slug}`}>
              <Link href={postUrl(p.collection, p.slug)}>
                <strong>{p.frontmatter.title}</strong>
                <p>{p.frontmatter.description}</p>
                <span className="blog-meta">
                  {p.collection} · {formatDate(p.frontmatter.date_created)}
                  <span className="blog-status">{p.frontmatter.status}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </BlogShell>
  );
}
