# hilmihisham.github.io
hilmihisham's webpage

[the page](https://hilmihisham.github.io/) | [another path](http://hilmihisham.com)

## Development

The site is being migrated to Astro and Cloudflare Workers. The Astro app lives in [site/](site/). The old root HTML files are still the live site until cutover (see issue #9).

Requires Node.js 22.23.4 or newer.

```bash
cd site
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # build to site/dist
npm run check     # type check .astro and .ts files
npm run preview   # serve the built site
```

To preview the built site as Cloudflare Workers serves it:

```bash
npm run build
npx wrangler dev --port 8787
```
