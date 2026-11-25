---
title: "Greffe de Lomé — un message caché dans les fins de ligne"
date: 2026-11-19 16:30:00 +0000
categories: ["NCTF26 Finale", "Stego"]
tags: [stego, whitespace, text, binary-encoding]
lang: fr
ctf: "NCTF26 Finale"
category_label: "Stego"
difficulty: easy
flag_format: "NCTF{...}"
author: alwil17
toc: true
---

> **TL;DR** — Un arrêté administratif en `.txt` dont les **fins de ligne** portent
> le message : un espace de queue = 0, une tabulation = 1. Je regroupe les bits par
> 8 (MSB d'abord) et je reconstitue le flag. **Flag :** `NCTF{…}`.

## 1. L'indice

Le fichier `arrete-greffe-lome.txt` paraît anodin, mais chaque ligne se termine par
un caractère d'espacement invisible — tantôt une espace, tantôt une tabulation. Un
`cat -A` révèle les `$` (espace) et `^I` (tab) de fin de ligne.

## 2. Décoder

Convention : **espace = 0, tab = 1**. Un bit par ligne, regroupés en octets, MSB en
premier :

```python
bits = "".join("0" if line.rstrip("\n").endswith(" ") else "1"
               for line in open("arrete-greffe-lome.txt"))
flag = bytes(int(bits[i:i+8], 2) for i in range(0, len(bits)-len(bits)%8, 8))
```

## 3. Flag

```text
NCTF{…}
```

## 4. Leçons

- **Les caractères d'espacement invisibles** (espaces de queue, tabulations)
  transportent de l'information sans altérer l'apparence du texte. Un éditeur qui
  affiche les blancs ou `cat -A` les révèle immédiatement.
