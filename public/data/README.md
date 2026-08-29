# Content guide

These JSON files are the editable content layer for the portfolio. Keep JSON commas and quotation marks intact.

## Add or edit a project

Edit `projects.json`. Each project contains:

- `slug` — URL-safe identifier used in `/projects/{slug}`
- `title` and `year` — shared by the card and detail page
- `githubHref` — repository URL
- `projectLink` — optional second link with `label` and `href`; it appears as a matching project-link card beside GitHub
- `detailImages` — carousel images with `src`, `alt`, and optional `position`, `fit`, and `caption`
- `sections` — detail-page tiles written in Markdown

Use headings such as `## Overview`, `## What I Built`, and `## Stack`. Cards automatically use the Overview text as their description and the first three Stack entries as their tags, so those values never need to be duplicated. Do not add a Markdown Links section: GitHub and the optional `projectLink` are rendered as dedicated bento cards beside Stack.

## Edit experience

Edit `resume.json`. Entries appear in array order. `startDate` and `endDate` control date sorting and display behavior; `href` is optional.

## Edit the rest of the site

Edit `site.json` for:

- hero and profile copy
- navigation items
- skills and outside interests
- contact links
- interface messages and footer content

Images, the resume PDF, fonts, and icons live elsewhere in `public/` and are referenced with paths beginning with `/`.
