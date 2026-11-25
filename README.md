# FireSkull — CTF Writeups

Standards-driven capture-the-flag writeups, built with [Astro](https://astro.build) and
published on GitHub Pages.

**Live site:** <https://alwil17.github.io/ctf-writeups/>

## Writeup standard

Every post follows one structure: reconnaissance → analysis → exploitation → flag →
remediation. See the pinned [style guide](src/content/posts/2026-11-20-writeup-style-guide.md)
and the template at [`templates/writeup.md`](templates/writeup.md).

- `categories` is always `[Event, Category]`; `tags` are lowercase and hyphenated.
- CTF metadata (`ctf`, `category_label`, `difficulty`, `points`, `flag_format`) renders as
  the info box at the top of each post. The schema lives in
  [`src/content.config.ts`](src/content.config.ts); a bad value fails the build.
- The first `> **TL;DR** — …` blockquote is the post summary on the home page, in feeds
  and in meta descriptions.
- Posts keep the language they were solved in (`lang: fr | en`); never mixed.
- Callouts use GitHub alert syntax: `> [!TIP]`, `> [!WARNING]`, `> [!NOTE]`…

## Adding a writeup

1. Copy `templates/writeup.md` to `src/content/posts/YYYY-MM-DD-<slug>.md`.
   The URL becomes `/posts/<slug>/`.
2. Fill the front matter and sections.
3. Strip anything sensitive (live creds, VPN configs, private keys, internal session
   notes). Truncate every flag to its first four characters (`NCTF{4d_3…}`), encoded
   forms included.

## Local development

Requires Node 22+.

```bash
npm install
npm run dev        # http://localhost:4321/ctf-writeups/
npm run build      # type check + static build + search index into dist/
npm run preview    # serve dist/ (search works here, not in dev)
```

## Deployment

`.github/workflows/pages-deploy.yml` builds and deploys on every push to `master`.
In the repo's **Settings → Pages**, **Source** must be **GitHub Actions**.

## License

Writeup content © alwil17. Site code under the [MIT](LICENSE) license.
