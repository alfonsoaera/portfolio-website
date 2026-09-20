# Alfonso Rodríguez Arraiza — Portfolio

A static, dependency-free portfolio site for director / editor / audiovisual
content creator work. Plain HTML, CSS and JavaScript — no build step, no
framework, deploys anywhere that serves static files.

## Structure

```
index.html          Page markup and content
css/style.css        All styling (dark cinematic theme)
js/main.js           Nav toggle, scroll reveal, portfolio filter, lightbox, language switch
assets/images/       Photos, favicon.svg, og-image.png (social share preview)
assets/video/        Put a self-hosted reel file here (e.g. reel.mp4)
```

## Customize

1. **Hero background video** — open `index.html`, find `<section class="hero">`.
   Drop a file at `assets/video/hero-bg.mp4` and it plays automatically
   (muted, looped, no controls) behind your name — no code changes needed.
   Until that file exists, it silently falls back to the plain background.
   The comment above `.hero-media` also shows how to use a YouTube/Vimeo
   clip instead.

2. **Reel** — open `index.html`, find the `<section class="reel">` block.
   It has a comment with two ready-to-use snippets:
   - a YouTube/Vimeo `<iframe>` embed (just paste your video ID/link), or
   - a self-hosted `<video>` tag pointing at `assets/video/reel.mp4`.
   Replace the `.reel-placeholder` div with whichever you use.

3. **Portfolio grid** — in `<section class="work">`, each `<figure class="grid-item">`
   is one project. To use a real image instead of the text placeholder:
   ```html
   <button class="grid-thumb" data-title="…" data-desc="…" data-category="…">
     <img src="assets/images/your-photo.jpg" alt="Project name" style="width:100%;height:100%;object-fit:cover;">
   </button>
   ```
   Set `data-category` on the parent `<figure>` (`director`, `editor`,
   `social`, or `motion`) so the filter buttons work, and update the
   matching `data-category` label on the button for the lightbox.

   To make a tile play a **video** when clicked (the default for all four
   categories currently), add a `data-video` attribute to the button:
   ```html
   <button class="grid-thumb" data-title="…" data-desc="…" data-category="Director"
           data-video="https://www.youtube.com/embed/YOUR_VIDEO_ID">
   ```
   or point it at a file you dropped in `assets/video/`:
   ```html
   data-video="assets/video/my-edit.mp4"
   ```
   Leave `data-video` empty/off to keep a plain image tile instead.

   **Featured tab** — the "Destacado"/"Featured" filter shows only pieces
   with `data-featured="true"` on their `<figure>`. Every other filter
   (Director/Editor/Digital/Motion) shows the full list for that category
   regardless of the featured flag — a piece can be in both.

   **Campaigns** — if several pieces belong to the same shoot/client
   campaign, give each button the same `data-campaign="some-slug"` value.
   Opening any one of them adds a "More from this campaign" row in the
   popup linking to the others; clicking a sibling swaps the popup to that
   piece without closing it. Leave `data-campaign` off for standalone pieces.

4. **About photo** — swap the `.about-photo` placeholder div for an `<img>`
   pointing at a photo in `assets/images/`.

5. **Contact info** — update the email and social links near the bottom of
   `index.html` (`<section class="contact">`), and the matching icon links
   in `<footer class="site-footer">`.

6. **Colors** — the accent color and palette are defined as CSS variables at
   the top of `css/style.css` (`:root { --accent: ...; --bg: ...; }`).

7. **Language (Spanish/English)** — the site defaults to Spanish. Any text
   that should switch languages carries `data-es="…" data-en="…"` attributes
   (or `data-es-html`/`data-en-html` for text containing tags); `js/main.js`
   swaps between them when the "EN"/"ES" pill in the nav is clicked, and
   remembers the visitor's choice. To make a new piece of text translatable,
   just add matching `data-es`/`data-en` attributes to it.

8. **Favicon & social share image** — `assets/images/favicon.svg` (the "AE / RA"
   mark) and `assets/images/og-image.png` (shown when the link is shared on
   WhatsApp/Twitter/etc.) were generated from the site's own fonts/colors.
   Regenerate either if you change the name, palette, or fonts. Once you
   move to a custom domain, update `og:url` in `index.html`'s `<head>` to match.

## Run locally

No build step needed. Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Any static host works. A few common options:

- **GitHub Pages**: Settings → Pages → deploy from the branch/root of this repo.
- **Netlify / Vercel**: import the repo, no build command needed, publish
  directory is the repo root.
