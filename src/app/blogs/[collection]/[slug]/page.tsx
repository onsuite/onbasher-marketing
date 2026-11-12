import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { PostArticle } from '@/components/PostArticle';
import { SHOW_DRAFTS, getCollection, getPost, getPosts, postUrl } from '@/lib/blog';

/**
 * /blogs/<collection>/<slug> — the DEFAULT home for collections without a
 * `route`, and a 308 redirect to the canonical URL for collections that
 * declare one.
 */

interface Params {
  collection: string;
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getPosts({ includeDrafts: SHOW_DRAFTS }).map((p) => ({
    collection: p.collection,
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const meta = getCollection(params.collection);
  if (meta?.route) return {}; // redirecting — no metadata of its own
  const post = getPost(params.collection, params.slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const published = fm.status === 'published';
  return {
    title: `${fm.title} — Basher`,
    description: fm.description,
    alternates: { canonical: fm.canonical ?? postUrl(post.collection, post.slug) },
    robots: published ? undefined : { index: false, follow: false },
    openGraph: { title: fm.title, description: fm.description, type: 'article' },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const meta = getCollection(params.collection);
  if (meta?.route) permanentRedirect(postUrl(params.collection, params.slug));
  const post = getPost(params.collection, params.slug);
  if (!post) notFound();
  return <PostArticle post={post} />;
}
