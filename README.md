# Menan Makeovers website

The website of Menan Makeovers, a bridal makeup studio in Pondicherry: **https://www.menanmakeovers.com**

Designed and developed by **Sharvesh** ([@Sharveshraja1009](https://github.com/Sharveshraja1009)).

The site runs on Wix Headless: this code is the front end, and the Wix site behind it keeps the business data (enquiry forms, photos, SEO settings, domain). The original drag-and-drop Wix Editor site is still saved in Wix. To go back to it, open the Wix dashboard → **Headless Settings** → **Switch back**.

## Tech stack

- [Astro 7](https://astro.build) with TypeScript
- Tailwind CSS 4 and a hand-written stylesheet (`src/styles/global.css`)
- React, only for the enquiry form
- Wix-managed headless hosting through `@wix/astro`, with Wix Forms, Wix Media and Wix SEO
- Published with the Wix CLI

## Project layout

| Path | What it holds |
|---|---|
| `src/data/site.json` | Most of the content: contact details, packages, team, reviews, the portfolio list, and every photo's Wix Media id, size and alt text |
| `src/pages/` | One file per page |
| `src/components/` | Page sections: package cards, gallery, team timeline, reviews, call-to-action band |
| `src/layouts/SiteLayout.astro` | Header, footer, SEO tags and the schema.org structured data |
| `src/styles/global.css` | Styles and animations |
| `public/` | Logo, site icons, Google Maps icon, IndexNow key file |
| `scripts/build-preview.mjs` | Builds the static client-preview copy into `dist-preview/` |

## Working on the site

Needs Node 22 or later and a Wix CLI login with the site owner's account. Run the commands in PowerShell.

```powershell
npm install
npx --yes @wix/cli@1.1.258 env pull    # writes .env.local with the site's keys; never commit it
npx --yes @wix/cli@1.1.258 build
npx --yes @wix/cli@1.1.258 release     # publishes straight to menanmakeovers.com
```

For a quick local look without Wix: `npx astro dev --config astro.config.local.mjs` (the enquiry form does not load locally).

## Notes for the next developer

- **Content:** change text, packages, team details and the portfolio list in `src/data/site.json`. Photos live in the site's Wix Media library; add a photo there, then add its id, size and alt text to `images` and its key to `portfolio`.
- **SEO:** the code writes every title, description, canonical link, social tag and the structured data. Wix's own default copies of those tags are switched off in the site's SEO pattern for static pages, so each page has one set. If the site is ever switched back to the old Editor site, reset that pattern to its default in the Wix SEO settings.
- **Secrets:** `.env.local` holds the site's Wix keys. It is listed in `.gitignore` and must stay out of the repository.

## Credits

Website design and development: **Sharvesh** ([@Sharveshraja1009](https://github.com/Sharveshraja1009)), for Menan Makeovers, Pondicherry.
