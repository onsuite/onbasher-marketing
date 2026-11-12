/**
 * Blog content loader — the /blogs surface. Self-contained (the starter has
 * no other markdown pipeline). Build-time IO: every caller is a Server
 * Component, so nothing hits the filesystem per-request in production.
 *
 * The draft gate: production builds render `status: published` only. Local
 * dev, Vercel previews, and an explicit SHOW_DRAFTS=1 render everything, so
 * the reviewer sees a draft in the real site theme before approving it.
 * A file existing is never sufficient to publish: the post page 404s
 * anything unpublished unless the environment opts in.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

marked.use({ gfm: true, breaks: false });

/** Dev + preview render drafts; production renders published only. */
export const SHOW_DRAFTS =
  process.env.NODE_ENV === 'development' ||
  process.env.VERCEL_ENV === 'preview' ||
  process.env.SHOW_DRAFTS === '1';

export type PostStatus = 'draft' | 'review' | 'published';

/** Frontmatter contract — validated by scripts/check-blog.mjs. */
export interface BlogFrontmatter {
  title: string;
  description: string;
  collection: string;
  status: PostStatus;
  author: string;
  date_created: string;
  date_published?: string;
  date_updated?: string;
  tags?: string[];
  canonical?: string;
}

export interface BlogPost {
  collection: string;
  slug: string;
  frontmatter: BlogFrontmatter;
  html: string;
}

export interface CollectionMeta {
  key: string;
  name: string;
  description: string;
  /** Public URL base for SEO/AEO (e.g. "/guides"). Absent → lives under /blogs/<key>. */
  route?: string;
}

interface Manifest {
  previewBase: string;
  collections: Record<string, { name: string; description: string; route?: string }>;
}

function loadManifest(): Manifest {
  const raw = fs.readFileSync(path.join(BLOG_DIR, 'collections.json'), 'utf8');
  return JSON.parse(raw) as Manifest;
}

/** The declared collections, manifest order. */
export function getCollections(): CollectionMeta[] {
  const manifest = loadManifest();
  return Object.entries(manifest.collections).map(([key, c]) => ({
    key,
    name: c.name,
    description: c.description,
    route: c.route,
  }));
}

export function getCollection(key: string): CollectionMeta | null {
  return getCollections().find((c) => c.key === key) ?? null;
}

/** Resolve a top-level section ("guides") to the collection routed there. */
export function getCollectionByRoute(section: string): CollectionMeta | null {
  return getCollections().find((c) => c.route === `/${section}`) ?? null;
}

/** Canonical index URL for a collection. */
export function collectionUrl(meta: CollectionMeta): string {
  return meta.route ?? `/blogs/${meta.key}`;
}

/** Canonical URL for a post — THE link builder; never hand-build post paths. */
export function postUrl(collectionKey: string, slug: string): string {
  const meta = getCollection(collectionKey);
  return `${meta?.route ?? `/blogs/${collectionKey}`}/${slug}`;
}

/** YAML parses unquoted dates as Date objects; the contract is YYYY-MM-DD strings. */
function asDateString(v: unknown): string | undefined {
  if (v == null) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

function readPost(collection: string, slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, collection, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const frontmatter = {
    ...data,
    date_created: asDateString(data.date_created),
    date_published: asDateString(data.date_published),
    date_updated: asDateString(data.date_updated),
  } as BlogFrontmatter;
  return {
    collection,
    slug,
    frontmatter,
    html: marked.parse(content, { async: false }) as string,
  };
}

/**
 * Posts, newest first. Drafts are excluded unless asked for — and callers
 * should only ask when SHOW_DRAFTS is set.
 */
export function getPosts(opts: { collection?: string; includeDrafts?: boolean } = {}): BlogPost[] {
  const keys = opts.collection ? [opts.collection] : Object.keys(loadManifest().collections);
  const posts: BlogPost[] = [];
  for (const key of keys) {
    const dir = path.join(BLOG_DIR, key);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const post = readPost(key, f.replace(/\.md$/, ''));
      if (!post) continue;
      if (post.frontmatter.status !== 'published' && !opts.includeDrafts) continue;
      posts.push(post);
    }
  }
  return posts.sort((a, b) => {
    const da = a.frontmatter.date_published ?? a.frontmatter.date_created ?? '';
    const db = b.frontmatter.date_published ?? b.frontmatter.date_created ?? '';
    return db.localeCompare(da);
  });
}

/**
 * A single post. Returns null for unpublished posts unless the environment
 * shows drafts — this, not generateStaticParams, is the production gate.
 */
export function getPost(collection: string, slug: string): BlogPost | null {
  const post = readPost(collection, slug);
  if (!post) return null;
  if (post.frontmatter.status !== 'published' && !SHOW_DRAFTS) return null;
  return post;
}

/** Human-readable date for the meta line. */
export function formatDate(iso: string | undefined): string {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
