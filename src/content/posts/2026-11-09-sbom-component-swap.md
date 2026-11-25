---
title: "sbom-component-swap — hunting a backdoored component via hash pivot"
date: 2026-11-09 11:00:00 +0000
categories: ["NCTF26 Prequals", "Misc"]
tags: [supply-chain, sbom, cyclonedx, hash, incident-response]
lang: en
ctf: "NCTF26 Prequals"
category_label: "Supply Chain"
difficulty: medium
points: 150
flag_format: "NCTF{...}"
author: alwil17
toc: true
---

> **TL;DR** — Hash every component listed in a CycloneDX SBOM against a SOC
> known-bad-hash feed. `acme-updater` v2.4.0 matches a
> `acme-updater-backdoor` entry; its binary carries a base64 config that
> decodes to the flag: `NCTF{sb0m…}`.


## 1. Briefing
Given a CycloneDX SBOM (`bom.json`), the component binaries, and a SOC
known-bad-hash feed (`known-bad-hashes.txt`), find the compromised component and
recover its flag.

## 2. Analysis & exploitation

1. Hash each component in `bom.json` and compare against the feed.
2. `acme-updater` (v2.4.0), hash
   `cb512bc9c1addaa11efd905a870dc559818497eac0cfdfdb23e1d30cfac0892b`, matches
   the known-bad entry `acme-updater-backdoor` — the swapped component.
3. Its blob `component-acme-updater.bin` embeds a config string:
   ```js
   var cfg = 'TkNURntz…';
   atob(cfg) // NCTF{sb0m…}
   ```

## 3. Flag
```
NCTF{sb0m…}
```

## 4. Lessons & remediation
| Weakness | Root cause | Fix |
|----------|-----------|-----|
| Swapped dependency | Component binary doesn't match its expected hash | Verify SBOM hashes in CI and at deploy; sign artifacts and enforce provenance (SLSA), reconcile against a trusted feed |
