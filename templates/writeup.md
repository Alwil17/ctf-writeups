---
title: "<Challenge name>"
# Copy to src/content/posts/YYYY-MM-DD-<slug>.md (URL becomes /posts/<slug>/)
date: 2026-11-19 20:00:00 +0000
categories: ["<Event>", "<Category>"]   # e.g. ["NCTF26 Prequals", "Web"]
tags: [web, crypto, length-extension]   # lowercase, hyphenated, reuse existing tags
lang: en                                # en | fr — the post's own language, never mixed
# ---- custom CTF metadata (rendered as the info box at the top of the post) ----
ctf: "NCTF26 Prequals"
category_label: "Web"
difficulty: medium                      # easy | medium | hard | insane | unknown
points: 100
flag_format: "NCTF{...}"
solves:                                 # optional
author: alwil17
toc: true
# images: put them in src/content/posts/<slug>/ and link them relatively
---


> **TL;DR** — One paragraph: the bug, the chain, and the flag. A reader should be able to
> stop here and know exactly what the challenge was and how it fell.

## 1. Briefing

### Description
> Verbatim challenge prompt / scenario.

### Provided assets
| File | Size | SHA-256 | Type |
|------|------|---------|------|
| … | … | … | … |

### Target
| Field | Value |
|-------|-------|
| URL / host | … |
| Credentials | … |
| Flag format | `NCTF{...}` |

### Constraints
- …

## 2. Environment & prerequisites
| Tool | Version | Purpose |
|------|---------|---------|
| … | … | … |

## 3. Reconnaissance
State the objective of each probe before the command, show the command, then the decisive output.

## 4. Analysis
Hypothesis → validation → **root cause**. This is where you explain *why* the bug exists.

## 5. Exploitation
Numbered, reproducible steps. Each step: what, the command/code, the result.

## 6. Flag
```
NCTF{...}
```

## 7. Dead ends & troubleshooting
What you tried that failed and why — this is what separates a real writeup from a cheat sheet.

## 8. Lessons & remediation
| Weakness | Root cause | Fix |
|----------|-----------|-----|
| … | … | … |

## Appendix A — Full exploit script
```python
# complete, runnable
```

## Appendix B — Raw evidence
Trimmed logs / captures that back up the claims above.
