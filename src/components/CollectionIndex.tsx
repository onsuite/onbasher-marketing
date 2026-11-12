import Link from 'next/link';
import { BlogShell } from '@/components/BlogShell';
import { SHOW_DRAFTS, formatDate, getPosts, postUrl, type CollectionMeta } from '@/lib/blog';

/** A collection's index page body — shared by the canonical section route and /blogs. */
export function CollectionIndex({ meta }: { meta: CollectionMeta }) {
  // Reviewers see drafts inline, marked; production lists published only.
  const posts = getPosts({ collection: meta.key, includeDrafts: SHOW_DRAFTS });

  return (
    <BlogShell title={meta.name} lede={meta.description}>
      {posts.length === 0 ? (
        <p>Nothing published in this collection yet.</p>
      ) : (
        <ul className={`blog-list blog-list--${meta.key}`}>
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={postUrl(meta.key, p.slug)}>
                <strong>{p.frontmatter.title}</strong>
                <p>{p.frontmatter.description}</p>
                <span className="blog-meta">
                  {formatDate(p.frontmatter.date_published ?? p.frontmatter.date_created)}
                  {p.frontmatter.status !== 'published' && (
                    <span className="blog-status">{p.frontmatter.status}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="blog-meta">
        <Link href="/blogs">← All posts</Link>
      </p>
    </BlogShell>
  );
}
