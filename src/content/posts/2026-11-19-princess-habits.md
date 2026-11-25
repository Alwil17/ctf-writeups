---
title: "Princess Habits — l'alphabet Ballet caché dans une vidéo"
date: 2026-11-19 18:40:00 +0000
categories: ["NCTF26 Finale", "Misc"]
tags: [misc, stego, video, ballet-alphabet, cipher]
lang: fr
ctf: "NCTF26 Finale"
category_label: "Misc"
difficulty: easy
flag_format: "NCTF{...}"
author: alwil17
toc: true
---

> **TL;DR** — Une vidéo de danse où les silhouettes des danseuses, à des instants
> précis, forment les lettres de l'**alphabet Ballet**. Je les relève dans l'ordre,
> je les décode, et j'ajoute le nom de la vidéo à la fin pour obtenir le flag.
> **Flag :** `NCTF{…}`.

## 1. Repérer les silhouettes

Deux passages portent le message : à partir de **0:55** et vers **2:24**. Les poses
des danseuses correspondent aux signes de l'**alphabet Ballet** (une pose = une
lettre).

## 2. Décoder

Je relève les silhouettes **dans leur ordre d'apparition** et je les décode avec
l'alphabet Ballet (par ex. l'outil dcode.fr : `https://www.dcode.fr/alphabet-ballet`),
en minuscules.

## 3. Composer le flag

Je mets les lettres bout à bout, puis j'ajoute le **nom de la vidéo** à la fin, en
minuscules (`putmealsoattheEND!` → en minuscules), et j'écris le tout au format du
flag.

## 4. Flag

```text
NCTF{…}
```

## 5. Leçons

- **Un stégo peut vivre dans le contenu filmé**, pas dans les octets : ici, des
  poses de danse = un alphabet. L'indice (« habits » de princesse / ballet) nomme
  l'alphabet à utiliser, et le titre complète le message.
