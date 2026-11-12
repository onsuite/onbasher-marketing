import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CollectionIndex } from '@/components/CollectionIndex';
import { getCollectionByRoute, getCollections } from '@/lib/blog';

/**
 * Canonical top-level collection indexes for collections that declare a
 * `route` in content/blog/collections.json (SEO/AEO — not everything wants a
 * /blogs URL). Static top-level routes always win over this dynamic segment;
 * unknown sections 404. The starter ships with no routed collections — add
 * `"route": "/guides"` (etc.) to a collection to activate.
 */

export function generateStaticParams() {
  return getCollections()
    .filter((c) => c.route)
    .map((c) => ({ section: c.route!.slice(1) }));
}

export function generateMetadata({ params }: { params: { section: string } }): Metadata {
  const meta = getCollectionByRoute(params.section);
  if (!meta) return {};
  return {
    title: `${meta.name} — Basher`,
    description: meta.description,
    alternates: { canonical: meta.route },
  };
}

export default function SectionIndexPage({ params }: { params: { section: string } }) {
  const meta = getCollectionByRoute(params.section);
  if (!meta) notFound();
  return <CollectionIndex meta={meta} />;
}
