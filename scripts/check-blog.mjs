#!/usr/bin/env node
/**
 * Mechanical gate for blog posts. Run by the writer agent before handing a
 * draft over, and by the approve command before anything reaches main.
 *
 *   npm run blog:check                         # every post
 *   npm run blog:check -- content/blog/guides/foo.md
 *
 * Exits non-zero on any failure. Checks are mechanical only — editorial
 * judgment stays with the verifier agent and the human.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

const manifest = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, 'collections.json'), 'utf8'));
const COLLECTIONS = Object.keys(manifest.collections);
const STATUSES = ['draft', 'review', 'published'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** YAML parses unquoted dates as Date objects; normalize to YYYY-MM-DD. */
const asDateString = (v) =>
  v instanceof Date ? v.toISOString().slice(0, 10) : v == null ? v : String(v);

const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const files = args.length
  ? args.map((a) => path.resolve(ROOT, a))
  : COLLECTIONS.flatMap((c) => {
      const dir = path.join(BLOG_DIR, c);
      if (!fs.existsSync(dir)) return [];
      return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => path.join(dir, f));
    });

let failures = 0;
const fail = (file, msg) => {
  failures++;
  console.error(`FAIL  ${path.relative(ROOT, file)}  ${msg}`);
};

for (const file of files) {
  if (!fs.existsSync(file)) {
    fail(file, 'file does not exist');
    continue;
  }
  const slug = path.basename(file, '.md');
  const parentDir = path.basename(path.dirname(file));
  const { data: fm, content } = matter(fs.readFileSync(file, 'utf8'));

  // --- frontmatter ---
  if (!fm.title) fail(file, 'missing title');
  if (!fm.description) fail(file, 'missing description');
  else if (String(fm.description).length > 160)
    fail(file, `description is ${String(fm.description).length} chars (max 160)`);
  if (!fm.collection) fail(file, 'missing collection');
  else {
    if (!COLLECTIONS.includes(fm.collection))
      fail(file, `collection "${fm.collection}" not in collections.json`);
    if (fm.collection !== parentDir)
      fail(file, `collection "${fm.collection}" does not match directory "${parentDir}"`);
  }
  if (!STATUSES.includes(fm.status)) fail(file, `status must be one of ${STATUSES.join('|')}`);
  if (!fm.author) fail(file, 'missing author');
  const dateCreated = asDateString(fm.date_created);
  const datePublished = asDateString(fm.date_published);
  if (!dateCreated || !DATE_RE.test(dateCreated))
    fail(file, 'date_created missing or not YYYY-MM-DD');
  if (fm.status === 'published' && (!datePublished || !DATE_RE.test(datePublished)))
    fail(file, 'published post missing date_published (YYYY-MM-DD)');
  if (fm.status !== 'published' && fm.date_published)
    fail(file, 'date_published is set but status is not published — only approve sets it');

  // --- filename ---
  if (!SLUG_RE.test(slug)) fail(file, `filename "${slug}" is not kebab-case`);

  // --- body ---
  if (/\{\{[^}]*\}\}/.test(content)) fail(file, 'body contains {{placeholder}}');
  if (/HUMAN TODO/i.test(content)) fail(file, 'body contains a HUMAN TODO block');
  if (content.trim().length < 200) fail(file, 'body under 200 chars — not a post');
}

if (files.length === 0) {
  console.error('FAIL  no posts found to check');
  process.exit(1);
}
if (failures) {
  console.error(`\n${failures} failure(s) across ${files.length} file(s).`);
  process.exit(1);
}
console.log(`PASS  ${files.length} post(s) clean.`);
