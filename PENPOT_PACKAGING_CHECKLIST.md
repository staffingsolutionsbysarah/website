# Penpot Packaging Checklist

Purpose: package the current live Sarah Fell website into a Penpot-friendly asset handoff without affecting the live website.

Scope: read/export only.

Do not:

- change production code
- deploy anything
- rename live assets in place
- overwrite existing public assets
- touch Vercel config

## Output ZIP

Target archive name:

- `sarah-fell-penpot-handoff.zip`

Recommended folder structure inside the ZIP:

```text
/logo
/icons
/images
/screenshots
/copy
/notes
```

## 1. Logo Assets

Goal: provide editable brand marks for Penpot.

Include:

- primary logo as SVG
- alternate logo as SVG if available
- logo mark/icon as SVG if available

Current repo candidates to review:

- `public/GreenS-logo.svg`
- `public/SF - SS - Logo.svg`

Checklist:

- [ ] confirm which SVG is the primary live-site logo
- [ ] export/copy approved logo SVG into `/logo`
- [ ] add any secondary approved SVG logo into `/logo`
- [ ] if only raster logo mark exists, note that in `/notes/brand-notes.txt`

## 2. Icons as SVG

Goal: package reusable SVG assets already used by the site.

Current repo SVG files to review:

- `public/file.svg`
- `public/globe.svg`
- `public/window.svg`
- `public/next.svg`
- `public/vercel.svg`

Checklist:

- [ ] include only icons actually useful for the mock-up
- [ ] exclude framework/vendor filler icons unless they appear in the live design
- [ ] copy approved icons into `/icons`
- [ ] name them clearly, for example `icon-globe.svg`

## 3. Brand Images

Goal: package the images already used by the site so Penpot mock-ups do not rely on screenshots alone.

Current repo image candidates:

- `public/sarah-fell.png`
- `public/images/download.jpg`
- `public/images/download-1.jpg`
- `public/images/download-2.jpg`
- `public/images/download-3.jpg`
- `public/images/download-4.jpg`
- `public/brand/sarah-crest-thin-charcoal.png`

Checklist:

- [ ] copy Sarah portrait into `/images`
- [ ] copy all homepage/background/section imagery actually used on the live site into `/images`
- [ ] exclude unused placeholder assets
- [ ] keep original filenames unless there is a strong reason to normalize them

## 4. Copy / Text Extraction

Goal: keep website text editable in Penpot without retyping from screenshots.

Create these files:

- `/copy/homepage.txt`
- `/copy/about.txt`
- `/copy/jobs.txt`
- `/copy/book-a-call.txt`
- `/copy/nav-footer.txt`

What to include:

- page headings
- subheadings
- CTA labels
- body copy
- nav labels
- footer text

Checklist:

- [ ] extract homepage copy into `/copy/homepage.txt`
- [ ] extract about page copy into `/copy/about.txt`
- [ ] extract jobs page copy into `/copy/jobs.txt`
- [ ] extract booking page copy into `/copy/book-a-call.txt`
- [ ] extract nav and footer text into `/copy/nav-footer.txt`
- [ ] keep line breaks readable and grouped by section

## 5. Screenshots for Reference Only

Goal: provide visual references, not editable design sources.

Create:

- `/screenshots/home-full.png`
- `/screenshots/about-full.png`
- `/screenshots/jobs-full.png`
- `/screenshots/book-a-call-full.png`

Optional:

- `/screenshots/home-hero.png`
- `/screenshots/home-services.png`
- `/screenshots/home-process.png`
- `/screenshots/home-closing-cta.png`

Checklist:

- [ ] capture full-page screenshot of homepage
- [ ] capture full-page screenshot of about page
- [ ] capture full-page screenshot of jobs page
- [ ] capture full-page screenshot of book-a-call page
- [ ] capture section-detail screenshots only if useful for layout recreation
- [ ] keep screenshots in `/screenshots` only
- [ ] do not mix screenshots with editable assets

## 6. Notes for the Designer

Create:

- `/notes/brand-notes.txt`
- `/notes/page-map.txt`

Suggested contents for `brand-notes.txt`:

- primary logo file to use
- alternate logo file to use
- image usage notes
- any asset limitations, such as raster-only mark

Suggested contents for `page-map.txt`:

- homepage
- about
- jobs
- book a call
- nav
- footer

Checklist:

- [ ] identify the primary logo asset
- [ ] identify which images belong to which page/section
- [ ] note that screenshots are reference only
- [ ] note that prototype interactions should be rebuilt in Penpot

## 7. Packaging Rules

Checklist:

- [ ] package copies of assets, not working source edits
- [ ] do not alter existing production file paths
- [ ] do not commit packaging artifacts unless explicitly requested
- [ ] verify the ZIP opens cleanly
- [ ] verify no deployment files were changed

## 8. Final QA

Before handing off:

- [ ] all logo assets open correctly
- [ ] all SVGs remain vector
- [ ] all referenced images are included
- [ ] all text files exist and are readable
- [ ] all screenshots are clearly labeled as reference
- [ ] ZIP contents match the folder structure above
- [ ] no live-site code or config changes were required

## Safe Execution Note

This workflow does not affect the live website if handled correctly, because it is only:

- reading existing source/assets
- exporting screenshots
- copying files into a separate packaging directory
- zipping that packaging directory

It should not include:

- code edits
- rebuilds required for deployment
- pushes
- Vercel changes
