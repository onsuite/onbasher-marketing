import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostArticle } from '@/components/PostArticle';
import { SHOW_DRAFTS, getCollection, getCollectionByRoute, getPost, getPosts, postUrl } from '@/lib/blog';

/**
 * Canonical post URLs for routed collections. The publish gate lives in
 * getPost(): unpublished slugs return null in production regardless of what
 * exists on disk; only the human approve command writes `status: published`.
 */

interface Params {
  section: string;
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getPosts({ includeDrafts: SHOW_DRAFTS }).flatMap((p) => {
    const route = getCollection(p.collection)?.route;
    return route ? [{ section: route.slice(1), slug: p.slug }] : [];
  });
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const meta = getCollectionByRoute(params.section);
  if (!meta) return {};
  const post = getPost(meta.key, params.slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const published = fm.status === 'published';
  return {
    title: `${fm.title} — Basher`,
    description: fm.description,
    alternates: { canonical: fm.canonical ?? postUrl(meta.key, post.slug) },
    robots: published ? undefined : { index: false, follow: false },
    openGraph: { title: fm.title, description: fm.description, type: 'article' },
  };
}

export default function SectionPostPage({ params }: { params: Params }) {
  const meta = getCollectionByRoute(params.section);
  if (!meta) notFound();
  const post = getPost(meta.key, params.slug);
  if (!post) notFound();
  return <PostArticle post={post} />;
}
