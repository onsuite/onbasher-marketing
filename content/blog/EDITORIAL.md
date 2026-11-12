# Editorial rules — Basher blog

Read this at the start of every writing run. These rules outrank any task
description. Replace the voice section with this app's actual voice when the
content strategy lands; the non-negotiables stay.

## The non-negotiables (every OnSuite app)

1. **Never guess. Never fabricate.** A missing fact is fine; a wrong fact is
   the only unrecoverable mistake. If you cannot verify a claim, leave it out
   or mark it as an open question in your report — never in the published text.
2. **Bylines are real or team.** `author` is either a real, checkable human
   name supplied by a human, or the team byline `Basher Editorial`. Agents
   never invent a personal name, bio, or photo.
3. **No performance claims without a denominator and a date.** Not "10x
   faster" but the measured figure, or no claim.
4. **Describe only shipped behavior.** Never describe a feature or asset that
   does not exist today.
5. **Sources visible.** Where a post cites a fact, link the source in the
   body, not buried.
6. **Compliance language.** "appears to fall short of" — never "violates".
   Never assert a legal outcome you have not read in a primary source.

## Voice

Plain, specific, no filler. Short sentences. Concrete nouns. No "you won't
believe", no dark patterns, no upsell above the fold.

## Per-collection rules

- **posts** — one topic per post. Say what changed or what the reader can do,
  in the first two sentences.

## Status semantics (frontmatter `status`)

- `draft` — agent-written, unreviewed. Renders only in dev/preview.
- `review` — verifier has passed it; awaiting the human.
- `published` — set **only** by the human `approve` command. Never write this
  value yourself.

## What agents never do

Publish. Set `status: published`. Set `date_published`. Merge or push. Touch
`src/` or any file other than the one assigned post. Mark a Paperclip issue
`done`.
