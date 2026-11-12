/**
 * Shown on any /blogs page rendering unpublished content. Only reachable in
 * dev/preview (production 404s drafts in src/lib/blog.ts), so this is review
 * furniture, not a public state.
 */
export function DraftBanner({ status }: { status: string }) {
  return (
    <div className="blog-draft-banner" role="status">
      <strong>{status.toUpperCase()}</strong> — not published. This is a review
      preview; the page is hidden from production and search engines.
    </div>
  );
}
