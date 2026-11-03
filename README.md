# MyBookVibes

A dark, editorial book review site. Short, direct reviews with a 1–10 score, a searchable archive, and a weekly newsletter signup. The interface is in Spanish.

Built with [Astro](https://astro.build), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com) and [GSAP](https://gsap.com), and deployed on Netlify.

## Features

- **Home page** with a hero, a featured review of the week, three recent picks and a newsletter block.
- **Hero animations** made with GSAP:
  - A hand-drawn underline that draws itself under "3 minutos".
  - A warm glow that follows the mouse (only on devices with a mouse).
  - A counter that goes from 0 to the total number of reviewed books.
- **Book archive** (`/books`) with category filters, sorting by score or by most recent, and a "show more" button.
- **Review page for every book** (`/books/[slug]`), generated at build time. It has the cover, score, quote and key facts.
- **About page** with a short introduction and the scoring scale.
- **Newsletter form** with email validation and a confirmation checkmark.
- **Footer year** that always shows the current year.
- **Accessibility**: animations respect `prefers-reduced-motion`, and the animated counter is read by screen readers as a single number.

## Pages

| Route          | Description                                                        |
| :------------- | :----------------------------------------------------------------- |
| `/`            | Home: hero, featured review, recent picks and newsletter           |
| `/books`       | Archive with filters, sorting and pagination                       |
| `/books/[slug]`| Review of one book. `slug` comes from `src/data/books.ts`          |
| `/about`       | About Elena, how the scores work and the newsletter                |

## Stack

- [Astro](https://astro.build) 7, with static pages and React islands
- [React](https://react.dev) 19 through `@astrojs/react`
- [Tailwind CSS](https://tailwindcss.com) 4 through the Vite plugin, with the theme defined in `src/styles/global.css`
- [GSAP](https://gsap.com) 3 for the hero animations
- [Netlify adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/) (`@astrojs/netlify`)
- TypeScript and Prettier with `prettier-plugin-astro`

Node.js **22.12.0** or newer is required.

## Getting started

```sh
npm install
npm run dev
```

The dev server starts at [http://localhost:4321](http://localhost:4321).

## Scripts

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm run dev`     | Start the local dev server                      |
| `npm run build`   | Build the production site into `dist/`          |
| `npm run preview` | Preview the production build locally            |
| `npm run astro`   | Run the Astro CLI (`astro add`, `astro check`)  |

## Project structure

```text
/
├── public/
│   ├── covers/              # Book covers (one .jpg per book)
│   └── portraits/           # Photo of Elena
├── src/
│   ├── components/
│   │   ├── home/            # Home sections: Hero, FeaturedVerdict, RecentSelections, Dispatch
│   │   ├── Catalog.tsx      # Filters, sorting and pagination (React)
│   │   ├── CountUp.tsx      # Animated counter (GSAP)
│   │   ├── HeroGlow.tsx     # Glow that follows the mouse (GSAP)
│   │   ├── HeroUnderline.tsx# Hand-drawn underline (GSAP)
│   │   ├── NewsletterForm.tsx
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── TextLink.astro
│   ├── data/
│   │   └── books.ts         # All books and helper functions
│   ├── layouts/
│   │   └── BaseLayout.astro # Header, footer and page shell
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── books.astro
│   │   └── books/[slug].astro
│   └── styles/
│       └── global.css       # Tailwind theme (colors, fonts, animations)
├── astro.config.mjs
└── package.json
```

## Adding a book

All books live in one array in `src/data/books.ts`. To add one, put its cover in `public/covers/` and add an object to `books`:

```ts
{
  slug: "dune",
  title: "Dune",
  author: "Frank Herbert",
  score: 9.1,
  category: "scifi",
  pages: 620,
  chip: "Space opera",
  chipTone: "lilac",
  line: "“A desert, a prophecy and a family at war.”",
  quote: "Longer review text shown on the review page.",
  tag: "CIENCIA FICCIÓN · CLÁSICO",
  facts: ["Lectura de 12h", "Worldbuilding denso", "620 págs"],
  verdict: "Clásico vigente",
  verdictTone: "paper",
  recentRank: 5,
  featured: false,
  cover: "/covers/dune.jpg",
}
```

The review page `/books/dune` and the archive entry are created automatically, and the book counter on the home page updates by itself.

| Field                | Notes                                                                           |
| :------------------- | :------------------------------------------------------------------------------ |
| `slug`               | Used in the URL. Must be unique                                                 |
| `score`              | From 1 to 10. Scores of 9 or more are shown in the "hot" color                  |
| `category`           | `ficcion`, `terror`, `scifi`, `ensayo`, or `null` to show it only under "Todos" |
| `recentRank`         | Lower number means more recent. Used by the "Más recientes" sort                |
| `featured`           | Only one book should be `true`. It appears as the featured review on the home   |
| `homeOrder`          | Optional. Gives the book a place in "Selecciones recientes" on the home         |
| `homeBlurb`          | Optional. Short text for the home card                                          |
| `chipTone`/`verdictTone` | Color of the category chip and of the verdict text                          |

## Customizing

- **Colors, fonts and animations:** edit the `@theme` block in `src/styles/global.css`.
- **Edition number and featured date:** edit `edition` in `src/data/books.ts`.
- **Scoring scale and About text:** edit `src/pages/about.astro`.
- **Hero animation timing:** each component has its own `duration` and `delay` values.

## Notes

- The newsletter form only validates the email in the browser. It does not send or store it yet, so it needs a service or an API route to work for real.
- In development, the Netlify Edge Functions emulator is turned off in `astro.config.mjs`. The latest Deno versions do not accept a flag it uses, and this project has no edge functions.

## Deployment

The site is deployed on Netlify through `@astrojs/netlify`. Connect the repository to Netlify and it will run `npm run build` and use the adapter output.
