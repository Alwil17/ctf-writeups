---
title: "rbac-reveal — over-permissive Kubernetes RBAC + double base64"
date: 2026-11-08 11:00:00 +0000
categories: ["NCTF26 Prequals", "Sysadmin"]
tags: [kubernetes, rbac, secrets, base64, misconfiguration]
lang: en
ctf: "NCTF26 Prequals"
category_label: "Sysadmin / DevSecOps"
difficulty: easy
points: 100
flag_format: "NCTF{...}"
author: alwil17
toc: true
---

> **TL;DR** — A Kubernetes `Role` grants the `app` ServiceAccount
> get/list/watch on **all** secrets in the namespace instead of the one it
> needs. The target secret's token was base64-encoded by the deploy script
> *before* Kubernetes base64-encoded it as Secret data, so it decodes twice to
> the flag: `NCTF{k8s_…}`.


## 1. Briefing
A manifest bundle: `rbac.yaml` (`Role` + `RoleBinding`), `secret.yaml`, and a
`Deployment` mounting the secret. Recover the token.

## 2. Analysis

1. `rbac.yaml` grants ServiceAccount `app` get/list/watch on **all** secrets in
   namespace `kekeli` — it should have been scoped with
   `resourceNames: ["app-api"]`.
2. `secret.yaml` holds `app-api` with `data.token` base64-encoded (normal for a
   k8s Secret). A comment reveals the deploy script had already base64-encoded
   the value, so it is **double** base64.

## 3. Exploitation

```js
atob(atob('VGtOVVJu…'))
// 1st decode: TkNURntr…
// 2nd decode: NCTF{k8s_…}
```

## 4. Flag
```
NCTF{k8s_…}
```

## 5. Lessons & remediation
| Weakness | Root cause | Fix |
|----------|-----------|-----|
| Secret over-exposure | Role not scoped to `resourceNames` | Grant least privilege; scope secret access to named resources |
| "Encrypted" secret | base64 mistaken for encryption | Encrypt secrets at rest (KMS / sealed-secrets); base64 is encoding, not protection |
