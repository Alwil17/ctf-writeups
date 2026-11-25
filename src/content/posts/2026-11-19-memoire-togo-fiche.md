---
title: "Mémoire Togo — composer un identifiant de fiche à partir de trois sources"
date: 2026-11-19 17:20:00 +0000
categories: ["NCTF26 Finale", "OSINT"]
tags: [osint, misc, pivoting, correlation]
lang: fr
ctf: "NCTF26 Finale"
category_label: "OSINT"
difficulty: medium
flag_format: "NCTF{...}"
author: alwil17
toc: true
---

> **TL;DR** — Trois sources (un PDF, un forum, un média) fournissent chacune un
> morceau d'un identifiant canonique `MT-…-…-…`. Je compose l'ID, j'ouvre la fiche
> correspondante en écartant les homonymes/leurres, et j'y lis le flag. **Flag :**
> `NCTF{…}`.

## 1. Les trois morceaux

Le bundle donne trois éléments, chacun apportant une partie de l'identifiant :

- **PDF** — la référence de registre (segment de tête) ;
- **forum** — le segment du milieu ;
- **média** — le suffixe.

## 2. Composer l'ID canonique

L'identifiant de fiche suit le gabarit `MT-<registre>-<milieu>-<suffixe>`. Je
concatène les trois dans l'ordre :

```
MT-…-…-…
```

## 3. Ouvrir la bonne fiche

Plusieurs fiches partagent un préfixe (homonymes placés comme leurres). Seul l'ID
complet et exact mène à la bonne — celle qui contient le flag.

## 4. Flag

```text
NCTF{…}
```

## 5. Leçons

- **La corrélation multi-sources** est le cœur de l'OSINT : aucune source ne suffit,
  c'est leur assemblage dans le bon ordre qui résout. Les homonymes sont là pour
  faire valider un ID partiel — il faut les trois segments exacts.
