# hilmihisham.github.io
hilmihisham's webpage

[the page](https://hilmihisham.github.io/) | [another path](http://hilmihisham.com)

## Development

The site is being migrated to Astro and Cloudflare Workers. The Astro app lives in [site/](site/). The old root HTML files are still the live site until cutover (see issue #23).

Requires Node.js 22.23.4 or newer.

```bash
cd site
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # build to site/dist
npm run check     # type check .astro and .ts files
npm run preview   # serve the built site
npm run lint      # ESLint
npm run format    # Prettier, writes changes (use format:check to only check)
npm run test      # unit tests (Vitest)
npm run test:e2e  # browser tests (Playwright)
```

CI runs the same checks on every pull request (see [ci.yml](.github/workflows/ci.yml)): type check, lint, format check, unit tests, build, browser tests, and an internal link check.

To preview the built site as Cloudflare Workers serves it:

```bash
npm run build
npx wrangler dev --port 8787
```
