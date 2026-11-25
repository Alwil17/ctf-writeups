---
title: "PAL — Maintenance : du path traversal au SUID root"
date: 2026-11-19 17:30:00 +0000
categories: ["NCTF26 Finale", "Boot2Root"]
tags: [boot2root, path-traversal, ssh, suid, privilege-escalation]
lang: fr
ctf: "NCTF26 Finale"
category_label: "Boot2Root"
difficulty: medium
flag_format: "NCTF{...}"
author: alwil17
toc: true
---

> **TL;DR** — Un path traversal sur `/rapport?id=` me livre `agent.conf`. Un portail
> « badge » calcule un PIN que je dérive, et le couple seed+PIN donne le mot de
> passe SSH de `pal-ops`. En local, un binaire SUID `pal_check` lit un fichier cible
> arbitraire : je pointe `TARGET=/root/flag.txt`. **Flag :** `NCTF{…}`.

## 1. Path traversal

Le endpoint de rapports concatène un identifiant à un chemin sans contrôle :

```
/rapport?id=../../../../opt/pal/agent.conf
```

Je récupère `agent.conf` — il contient une graine (`seed`) et la logique du badge.

## 2. Badge gate → PIN

L'accès suivant est protégé par un « badge » : un PIN dérivé de la graine lue.
Je reproduis le calcul en local et j'obtiens le PIN.

## 3. SSH pal-ops

Le mot de passe de `pal-ops` est dérivé de `seed` + `PIN`. Je le reconstitue et je
me connecte en SSH.

## 4. SUID vers root

Sur la machine, `pal_check` est SUID root et lit un fichier passé en paramètre :

```bash
TARGET=/root/flag.txt ./pal_check     # lit le fichier avec les droits root
```

## 5. Flag

```text
NCTF{…}
```

## 6. Leçons & remédiation

- **Confiner `id=`** (pas de `..`, racine verrouillée) : la fuite de `agent.conf`
  débloque toute la chaîne.
- **Un SUID qui lit un chemin arbitraire = lecture root arbitraire.** Fixer la
  cible, laisser tomber les privilèges, et ne jamais dériver un mot de passe SSH
  d'une graine lisible.
