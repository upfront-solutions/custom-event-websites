# Custom Event Websites

Six static pages. No build step, no framework, no dependencies.

## Deploy

```bash
cd custom-event-websites
git init && git add -A && git commit -m "Site"
# push to GitHub, then import at vercel.com/new (or Cloudflare Pages)
```

No build command, output directory `.`. Upload the whole folder, not just `index.html`. The photos live in `img/`, the styles in `style.css` and the mobile menu in `nav.js`, and the page breaks without them.

## Files

| File | Purpose |
|---|---|
| `index.html` | Home page |
| `planners.html` | For event planners |
| `vendors.html` | For event vendors, including the SEO section |
| `examples.html` | Index of the example websites |
| `example-wedding.html` | Example site: a wedding laid out as a newspaper. Standalone, own styles, nothing is sent anywhere. |
| `example-mermaid.html` | Example site: Under the Sea kids birthday. Standalone, all illustration, no photos to license. |
| `nav.js` | Mobile menu. Loaded by all four brand pages. |
| `style.css` | Shared styles for the four brand pages. Change a color here and it changes everywhere. |
| `img/` | Nine event photos for the memory section, plus `img/wedding/` for the example site and `img/examples/` for the thumbnails |
| `llms.txt` | Plain-text brief for AI answer engines. Keep in sync with pricing. |
| `robots.txt` | Allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and the rest |
| `sitemap.xml` | Every page. Update `lastmod` when you change them. |
| `og.png` | 1200×630 social share card |
| `favicon.svg` | The cew mark |
| `vercel.json` | Clean URLs, cache headers, correct content type on `llms.txt` |

## The forms

All three are live on Formspree. Nothing left to configure.

| Page | Where it is | Formspree ID |
|---|---|---|
| Home | The "describe your vision" box, top and bottom | `xyekbwjb` |
| Planners | Bottom of the page | `xgaopkyb` |
| Vendors | Bottom of the page | `xppqodrg` |

**Test each one after you deploy.** Formspree emails you a confirmation link on the very first submission per form, and nothing arrives until you click it. Three forms means three confirmations.

### How they work

The home page box is a three-step flow, so it posts JSON with `fetch` rather than navigating away: the visitor types a vision, enters an email, and sees the thank-you without the page reloading.

The planner and vendor forms use plain `<form action="..." method="POST">` with JavaScript layered on top. With JS the submission happens in the background and the form swaps to a thank-you. Without JS, the browser posts normally and Formspree shows its own confirmation page. Either way the message gets through.

If Formspree ever returns an error, the form stays filled in and shows a line pointing at `hello@customeventwebsites.com`, so nobody loses what they typed.

I used plain `fetch` rather than the `@formspree/ajax` library. The library mainly provides form state and validation wiring, which these pages already have, and skipping it avoids loading a script from `unpkg` on every page view.

### Fields

Home: `email`, `message`.
Planners and vendors: `First name`, `Last name`, `email`, `Business name`, `message`, plus a hidden `_subject` so the emails are labelled.

Formspree uses the `email` field for reply-to, so you can hit reply on any notification.

## Changing a price

Four places: the tier card in `index.html`, the "How much does a custom event website cost?" FAQ answer, the JSON-LD `offers` block at the bottom, and `llms.txt`.

## Still to do

- Photo licensing: confirm commercial rights on the nine images in `img/` before this goes on a live domain.
- Vendor portfolio: there is a commented-out block in `vendors.html` marked `PORTFOLIO` showing exactly where examples go and what markup to use.
- One more example: the corporate holiday party card on `examples.html` is a placeholder until that site exists.
- Google Search Console: verify the domain, submit `sitemap.xml`.
