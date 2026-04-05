# Sushrit's Portfolio and Resume

Personal portfolio website and resume, built with Next.js and hosted on GitHub Pages. The resume is generated as a PDF from the same data that powers the website, so there is a single source of truth for everything.

## Repository structure

```
web/        Next.js application (source of truth for all content)
resume/     LaTeX resume generated from web/src/components/Sections/
blogs/      Markdown blog posts
assets/     Static assets copied into the build output
```

## Website

The portfolio is a statically exported Next.js site. It is broken into sections, each of which lives in `web/src/components/Sections/`:

- **WorkExperience** - employment history with position, organization, date range, and a list of responsibilities and technologies
- **Projects** - personal and client projects with descriptions, tech stack tags, date ranges, and links
- **Skills** - categorized technical skills (Frontend, Backend, Databases, ML/AI, DevOps, Testing, Misc)
- **Tools** - tools and project-management software in use
- **Certificates** - online courses and certifications with links
- **Extra** - accomplishments, side interests, and miscellaneous achievements

Each section is a plain TypeScript file that exports a React component and declares its data as a typed constant at the top of the file. The resume generator reads those same constants directly.

### Blog

Blog posts are written in Markdown and stored in `web/public/blogs/`. Each post is rendered via `web/pages/blogs/[slug].tsx` using `react-markdown`. Author information is stored in `web/public/blogs/authors.yml`. The blog index at `/blogs` lists all posts and supports client-side search.

### Building and deploying

```bash
cd web
make prepare
```

This runs `yarn build` (which statically exports the site to `web/out/`) and then copies the output into the repository root so GitHub Pages can serve it from `master`.

For local development:

```bash
cd web
yarn dev        # development server with hot reload
yarn serve      # serve the static export locally
```

## Resume

### How it works

The resume is not written by hand. `resume/generate.js` is a Node.js script that:

1. Reads each section file under `web/src/components/Sections/*/index.tsx`
2. Parses the TypeScript source and evaluates the data constants (e.g. `workExperience`, `projectsList`, `frontendSkills`)
3. Escapes all strings for LaTeX (handles special characters, strips emojis)
4. Writes a complete `resume.tex` file from scratch

A small set of data that has no equivalent on the website - contact details, the professional summary, and education - is hardcoded at the top of `generate.js` and should be updated there directly.

The sections sourced from the website are:

| Resume section | Source file | Variable(s) read |
|---|---|---|
| Technical Skills | `Sections/Skills/index.tsx` | `frontendSkills`, `backendSkills`, `databaseSkills`, `mlSkills`, `devopsSkills`, `testingSkills`, `miscSkills` |
| Tools | `Sections/Tools/index.tsx` | `tools`, `toolsPM` |
| Experience | `Sections/WorkExperience/index.tsx` | `workExperience` |
| Projects | `Sections/Projects/index.tsx` | `projectsList` |
| Certifications | `Sections/Certificates/index.tsx` | `coursesList` |
| Accomplishments | `Sections/Extra/index.tsx` | `extra` |

### Generating the PDF

Prerequisites: Node.js and a working `pdflatex` installation (e.g. TeX Live or MacTeX).

```bash
cd resume
make
```

This runs `node generate.js` to produce `resume.tex`, then compiles it with `pdflatex`. The final PDF is written to `resume/resume.pdf`.

To only regenerate the `.tex` file without compiling:

```bash
cd resume
node generate.js
```

### Keeping the resume in sync

Because the generator reads the website's TypeScript source files directly, updating a section on the website and then running `make` in `resume/` is all that is needed to keep the resume current. There is no separate data file to maintain.

### TODO

- [ ] An LLM-based tool to summarize the blogs for OpenGraph metadata.
- [x] An LLM-based tool to generate audio versions of the blogs for accessibility and podcasting.
    - [ ] Add AI-use disclosures to the blog posts that have AI-generated summaries/audio. And explain the local generation process.
- [ ] FIXME: When directly navigating to a blog URL, it's stuck on the loading screen.