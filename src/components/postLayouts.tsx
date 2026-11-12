import type { ComponentType } from 'react';
import type { BlogPost } from '@/lib/blog';

/**
 * Per-collection BODY renderers — the structural styling hook.
 *
 * Two tiers for changing a content type's look:
 *  1. CSS-only (most changes): every post body carries
 *     `blog-post blog-post--<collection>` — style it in styles/blog.css.
 *  2. Structural (different anatomy): add a component here keyed by
 *     collection. It replaces the default body only; the shell (banner,
 *     byline, JSON-LD, metadata) stays in PostArticle so SEO never forks.
 *
 * Agents cannot touch any of this — src/ is outside their write surface.
 */

export function DefaultPostBody({ post }: { post: BlogPost }) {
  return (
    <div
      className={`blog-post blog-post--${post.collection}`}
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  );
}

/** collection key -> body component. Empty entry = DefaultPostBody. */
export const POST_LAYOUTS: Record<string, ComponentType<{ post: BlogPost }>> = {};
