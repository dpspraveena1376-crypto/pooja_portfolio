# Pooja Sai Praveena — Portfolio

Production build of the "Portfolio v4" Claude Design, implemented with React 18 + Vite.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs static files to dist/
npm run preview  # serve the production build locally
```

## Deploy

`dist/` is a plain static site with relative asset paths, so it can be dropped onto any static
host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3…). Build command: `npm run build`,
publish directory: `dist`. No environment variables or backend are required.

## Layout

| Path | What it is |
| --- | --- |
| `src/Portfolio.jsx` | Page logic ported from the design: responsive measurements and all interaction state |
| `src/sections/` | One view component per section (Header, Dock, Home, About, Skills, Experience, Projects, Resume, Contact, Footer) |
| `src/styles/base.css` | Global resets, focus ring, reduced-motion rule |
| `src/styles/interactions.css` | Hover / pressed states |
| `src/styles/responsive.css` | Small-screen adaptations added on top of the design |
| `public/assets/` | Images, bricks, logos and the resume PDF used by the site |
| `design-source/` | The original Claude Design export, kept as the visual reference (not part of the build) |

To update the resume, replace `public/assets/Pooja-Sai-Praveena-Resume.pdf` and
`public/assets/resume-page.webp` (the preview image).
