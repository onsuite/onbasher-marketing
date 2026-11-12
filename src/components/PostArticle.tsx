import Link from 'next/link';
import { BlogShell } from '@/components/BlogShell';
import { DraftBanner } from '@/components/DraftBanner';
import { DefaultPostBody, POST_LAYOUTS } from '@/components/postLayouts';
import { collectionUrl, formatDate, getCollection, postUrl, type BlogPost } from '@/lib/blog';

/**
 * The one post renderer — used by both the canonical section routes (when a
 * collection declares a `route`) and the /blogs fallback, so the two can
 * never drift. Canonical URL and JSON-LD always come from postUrl().
 */
export function PostArticle({ post }: { post: BlogPost }) {
  const fm = post.frontmatter;
  const collection = getCollection(post.collection);
  const published = fm.status === 'published';
  const Body = POST_LAYOUTS[post.collection] ?? DefaultPostBody;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: fm.title,
    description: fm.description,
    author: { '@type': 'Organization', name: fm.author },
    datePublished: fm.date_published,
    dateModified: fm.date_updated ?? fm.date_published,
  };

  return (
    <BlogShell title={fm.title} lede={fm.description}>
      {!published && <DraftBanner status={fm.status} />}
      <p className="blog-byline">
        {fm.author} · {formatDate(fm.date_published ?? fm.date_created)}
        {collection && (
          <>
            {' · '}
            <Link href={collectionUrl(collection)}>{collection.name}</Link>
          </>
        )}
      </p>
      {published && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Body post={post} />
    </BlogShell>
  );
}
