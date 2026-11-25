---
title: "How I write these: the CTF writeup standard"
date: 2026-11-20 09:00:00 +0000
categories: ["Meta", "Guide"]
tags: [meta, methodology, writeup]
lang: en
pin: true
toc: true
author: alwil17
---

Every writeup on this site follows one structure. The point is reproducibility: a reader should
be able to re-walk the solve from scratch, and a defender should leave knowing how to fix the
underlying bug — not just what the flag was.

## Front matter

```yaml
categories: ["<Event>", "<Category>"]   # e.g. ["NCTF26 Prequals", "Web"]
tags: [web, crypto, length-extension]   # lowercase, hyphenated
lang: en                                # en | fr, never mixed inside one post
ctf: "NCTF26 Prequals"
difficulty: medium                      # easy | medium | hard | insane | unknown
points: 100
flag_format: "NCTF{...}"
```

`categories` is always `[Event, Category]`, which drives the archive and category pages. `tags`
are lowercase and hyphenated so the tag cloud stays coherent.

## Canonical taxonomy

- **Categories:** Web, Crypto, Pwn, Reverse, Forensics, Stego, OSINT, Boot2Root, KOTH, Cloud,
  Sysadmin, Misc, Warmup.
- **Difficulty:** easy / medium / hard / insane / unknown.

## Section skeleton

1. **TL;DR** — the bug, the chain, the flag, in one paragraph.
2. **Briefing** — description, provided assets (with hashes), target, constraints.
3. **Environment & prerequisites** — tools and versions, so the solve is reproducible.
4. **Reconnaissance** — state the objective of each probe before running it.
5. **Analysis** — hypothesis → validation → root cause.
6. **Exploitation** — numbered, reproducible steps.
7. **Flag.**
8. **Dead ends & troubleshooting** — what failed and why.
9. **Lessons & remediation** — a weakness / root-cause / fix table.
10. **Appendices** — the full exploit script and raw evidence.

## Language policy

Posts are written in the language I solved them in. French challenges stay French, English stay
English. Languages are never mixed inside a single post; the `lang` field records which one.

## What never gets published

Flags are truncated to their first four characters (`NCTF{4d_3…}`), including any encoded form
of the flag shown in the post: the writeup explains how to get it, it does not hand it out. Live
credentials, VPN configs, private infrastructure details, and anything from internal session notes
are stripped before a writeup goes up.
