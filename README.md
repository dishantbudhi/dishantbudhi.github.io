# Dishant Budhi — Portfolio

React and Vite portfolio for [dishantbudhi.com](https://dishantbudhi.com).

## Editing content

Most site updates only require editing JSON in [`public/data`](./public/data):

- `site.json` — profile, navigation, skills, contact links, and footer copy
- `resume.json` — experience entries
- `projects.json` — project cards and project-detail content

See [`public/data/README.md`](./public/data/README.md) for field-level guidance.

## Project structure

```text
src/
├── components/
│   ├── home/       # Home-page sections
│   ├── layout/     # Hero, navigation, background, and footer
│   ├── projects/   # Project cards, carousel, gallery, and detail view
│   └── ui/         # Reusable UI primitives
├── config/         # Content file locations
├── hooks/          # Shared React behavior
├── pages/          # Route-level components
├── styles/         # Design tokens and global styles
└── types/          # JSON and component data contracts
```

## Development

```bash
npm install
npm run dev
```

Before publishing changes:

```bash
npm run check
```

The site is deployed through GitHub Pages and Actions.
