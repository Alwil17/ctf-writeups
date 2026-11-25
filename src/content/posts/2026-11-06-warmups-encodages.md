---
title: "Warmups — neuf défis d'encodage (NCTF26 Prequals)"
date: 2026-11-06 12:00:00 +0000
categories: ["NCTF26 Prequals", "Warmup"]
tags: [warmup, encoding, base64, base32, base85, atbash, morse, forensics]
lang: fr
ctf: "NCTF26 Prequals"
category_label: "Warmup"
difficulty: easy
points: 50
flag_format: "NCTF{...}"
author: alwil17
toc: true
---

> **TL;DR** — Neuf défis d'échauffement à 50 points, chacun un encodage ou une
> dissimulation triviale. Regroupés ici : la leçon commune est qu'un encodage
> n'est pas du chiffrement.


## 1. Encodages de base

| Défi | Entrée | Commande | Flag |
|------|--------|----------|------|
| base64 | `TkNURnt...` | `base64 -d secret.txt` | `NCTF{base…}` |
| base32 | `JZBVIRT3...` | `base32 -d secret.txt` | `NCTF{base…}` |
| base85 | `PD4~idu3...` | `python3 -c "import base64;print(base64.b85decode(open('secret.txt','rb').read().strip()))"` | `NCTF{eigh…}` |

## 2. Substitution & représentations

**atbash-cipher** — miroir de l'alphabet (A↔Z, B↔Y…) :
```
MXGU{zgyz…}  →  NCTF{atba…}
```
Pour chaque lettre `c` : `chr('a'+'z'-c)`, casse conservée.

**morse-code** — lettres séparées par espace, mots par `/` :
```
-- --- .-. ... . / -.-. --- -.. . / .. ... / . .- ... -.--
→ MORSE CODE IS EASY  →  NCTF{mors…}
```

**binary-ascii** — groupes de 8 bits, `chr(int(b,2))` par groupe :
```
NCTF{bina…}
```

**html-entities** — entités numériques `&#NNN;` :
```bash
python3 -c "import html;print(html.unescape(open('page_snippet.txt').read()))"
# NCTF{ampe…}
```

## 3. Dissimulation dans un conteneur

**csv-cell** — flag caché dans une cellule du CSV :
```bash
grep -o 'NCTF{[^}]*}' roster.csv   # NCTF{hidd…}
```

**zip-comment** — flag dans le commentaire de l'archive, pas dans un fichier :
```bash
unzip -z archive.zip               # NCTF{look…}
```

## 4. Leçon
Base64/base32/base85, Atbash, Morse, binaire et entités HTML sont des
**représentations réversibles**, pas des protections. Un commentaire ZIP ou une
cellule CSV cachent sans chiffrer : toujours inspecter les métadonnées d'un
conteneur, pas seulement son contenu principal.
