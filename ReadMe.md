# Wedding Invitation

Static single‑page wedding invitation / event site built with HTML5, CSS (Bootstrap + custom styles), a bit of jQuery plugins (carousel, countdown, popup), and Sass sources for customization.

## Contents
Key top-level files:
- `index.html` – landing / hero & countdown
- `about.html`, `services.html`, `gallery.html`, `contact.html` – supporting pages
- `css/` – compiled CSS assets (Bootstrap, animations, carousel, popup, custom `style.css`)
- `sass/` – Sass source (Bootstrap partials + `style.scss` for theme overrides)
- `js/` – vendor JS + initialization in `main.js`
- `images/` – photography & background images
- `fonts/` – icon & glyph fonts

## Developing / Customizing
You can edit the static HTML directly. For style changes:
1. Modify variables / partials inside `sass/` (e.g. colors in `bootstrap/_variables.scss` or custom rules in `sass/style.scss`).
2. Recompile Sass to CSS (you can choose any Sass compiler). Example with Dart Sass (install first):
	`sass sass/style.scss css/style.css --style=compressed`
3. Commit updated `css/style.css` (do not commit temporary caches).

## Deployment
Because it is a pure static site, you can host it on:
- GitHub Pages (recommended): push to `main`, then in repository Settings → Pages select the root (`/`).
- Any static host (Netlify, Vercel, S3, etc.). Just upload the root directory.

## Future Ideas
- Add form handling via a serverless service (Formspree, etc.).
- Optimize images (convert large JPGs to modern formats, add lazy loading).
- Bundle / tree‑shake JS (optional, current size is already small).

## Credits
Original HTML/CSS template assets came from a free Bootstrap-based wedding / event theme (ThemeWagon and related open-source components). Fonts & plugins remain under their respective licenses (Bootstrap, jQuery plugins, IcoMoon / Glyphicons). Replace third‑party promotional text with your own content as needed.

## License
Provide your chosen license here (e.g. MIT) if you plan to open-source modifications. Remove third‑party materials if their licenses are incompatible.

---
Feel free to adjust this README to match your event’s details (names, date, location, RSVP instructions).
