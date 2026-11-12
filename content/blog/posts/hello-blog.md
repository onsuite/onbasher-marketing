---
title: The Basher blog is live
description: This site now has a blog. Posts are drafted by agents, reviewed by a human in the real site theme, and published only through an explicit approve step.
collection: posts
status: published
author: Basher Editorial
date_created: 2026-08-03
date_published: 2026-08-03
tags: [meta]
---

This is the starter's sample post — it exists so `/blogs` renders something
on a fresh scaffold and so the first agent run has an exemplar to read.

The pipeline behind it, in one paragraph: topics are seeded as Paperclip
issues; a writer agent drafts one post per run on a `draft/<slug>` branch; a
verifier gates it; a human reviews it on the local dev server in this exact
theme, edits if needed, and approves. The approve command is the only thing
that ever sets `status: published` — a draft cannot reach production by
existing on disk.

Replace this post when the app's real content lands.
