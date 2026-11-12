# Basher Marketing Website (starter template)

> **Context** — onBasher: the starter/template app — the scaffolding reference, not a product; this repo is the marketing-site template. **Changes here propagate to every future scaffold.** Status: template · Current focus: scaffolding reference. Owning plans: onsuite-docs/scaffolding/ guides · App docs: none yet (plan 060 Phase 2).
> Platform contract: use the `platform-contract` + `ui-contract` skills (onsuite-dev plugin), not onsuite-api source. Cross-cutting lessons: onsuite-docs/learnings/.

Reference marketing site for an OnSuite app. Public-facing at **onbasher.onsuite.in**; the
authenticated app lives at **app.onbasher.onsuite.in** (separate repo: `onbasher-app`).

This is the template `store.sh scaffold` clones into `on<name>-marketing`. Every OnSuite app
gets its own marketing repo deployed to `{app}.onsuite.in` and rendered at `/` — the app repo
itself only serves `app.{app}.onsuite.in`.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS available (the starter page uses inline styles)
- Deployed on Vercel (mirrored from `onsuite/on<name>-marketing` → `vineelnalla/on<name>-marketing`
  via `.github/workflows/sync-to-fork.yml`)

## Project Structure

```
content/blog/          # the blog surface (/blogs) — agent-drafted, human-approved
  collections.json     # manifest: collections agents may write + previewBase (dev port)
  EDITORIAL.md         # voice + claims rules — agents read every run; per-app, edit freely
  topics.csv           # seed backlog for the Paperclip pipeline (content.sh seed)
  <collection>/<slug>.md  # status: draft|review|published; production renders published ONLY
agents/
  blog-writer.md       # Paperclip agent instructions (workspace-bound cwd, no absolute paths)
  blog-verifier.md
scripts/
  check-blog.mjs       # npm run blog:check — the mechanical gate agents + approve run
src/
  app/
    layout.tsx       # Site shell
    page.tsx         # / — homepage (renders at the domain root)
    blogs/           # blog index · [collection]/[slug] · drafts (dev/preview-only queue)
    globals.css
  components/        # BlogShell, DraftBanner — replace with the app's own chrome later
  lib/
    urls.ts          # PLATFORM_URL / APP_URL / SIGN_IN_URL / SIGN_UP_URL / OPEN_APP_URL
    blog.ts          # blog loader — SHOW_DRAFTS gate: prod renders status:published only
  styles/blog.css    # neutral blog styles — restyle per app
public/
  icon.svg
```

**Blog pipeline** (workspace-level, see the `blog-content` skill): drafts are written by
Paperclip agents on `draft/<slug>` branches, reviewed on the local dev server in the real
theme, and published only by `scripts/content.sh approve <app> <slug>` — which is the only
writer of `status: published`. A post existing on disk is never sufficient to publish.

## URL Structure

- **{app}.onsuite.in** → this site (renders at `/`)
- **app.{app}.onsuite.in** → the app (separate repo)
- Sign-in goes through the platform SSO launcher (`app.onsuite.in/sso/<slug>`); Get-started → `app.onsuite.in/signup`

URL constants live in `src/lib/urls.ts`. Set `NEXT_PUBLIC_ONSUITE_APP_URL` and
`NEXT_PUBLIC_ON<NAME>_APP_URL` in the Vercel dashboard (build-time inlined — not `vercel.json`).

## Commands

```bash
npm install
npm run dev      # localhost:4027 (onbasher); scaffolded apps get 40xx
npm run build
npm run lint
```
