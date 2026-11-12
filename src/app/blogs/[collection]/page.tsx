import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { CollectionIndex } from '@/components/CollectionIndex';
import { collectionUrl, getCollection, getCollections } from '@/lib/blog';

export function generateStaticParams() {
  return getCollections().map((c) => ({ collection: c.key }));
}

export function generateMetadata({ params }: { params: { collection: string } }): Metadata {
  const meta = getCollection(params.collection);
  if (!meta || meta.route) return {};
  return {
    title: `${meta.name} — Basher blog`,
    description: meta.description,
    alternates: { canonical: `/blogs/${meta.key}` },
  };
}

export default function CollectionPage({ params }: { params: { collection: string } }) {
  const meta = getCollection(params.collection);
  if (!meta) notFound();
  if (meta.route) permanentRedirect(collectionUrl(meta));
  return <CollectionIndex meta={meta} />;
}
