# Premium Landing Page Template

A clean, fully editable HTML/CSS/JS landing page template built around the **PAS copywriting framework** (Problem → Agitation → Solution). Designed to convert visitors into customers for any product, service, course, or app.

---

## What's Included

```
/
├── index.html      — Page structure and content
├── style.css       — All styling and design tokens
├── main.js         — Scroll animations, FAQ accordion, navbar behavior
└── README.md       — This guide
```

---

## Getting Started

No installation. No terminal. No build tools required.

1. Download and unzip the template folder
2. Open `index.html` in your code editor
3. Replace placeholder text and images with your own content
4. Open `index.html` in a browser to preview your changes
5. Upload the entire folder to your web host when ready

> **Recommended editor:** [VS Code](https://code.visualstudio.com/) (free). Install the **Live Server** extension for instant browser preview on save.

---

## Customization

### Colors & Branding

All colors are controlled by CSS variables at the very top of `style.css`. You only need to edit this one block to retheme the entire page.

```css
:root {
    --primary-gold:       #c9a84c;   /* Main accent — buttons, icons, highlights */
    --primary-gold-hover: #b8923e;   /* Button hover state */
    --bg-dark:            #111111;   /* Page background */
    --text-white:         #ffffff;   /* Headlines */
    --text-muted:         #aaaaaa;   /* Body paragraphs */
}
```

**To change the accent color:** replace both `--primary-gold` values with your brand color.  
**To use a light theme:** change `--bg-dark` to a light color (e.g. `#f9f5ef`) and adjust text colors accordingly.

---

### Fonts

Two fonts are loaded from [Google Fonts](https://fonts.google.com):

| Variable | Current Font | Used For |
|---|---|---|
| `--font-display` | Cormorant Garamond | Headings (h1, h2) |
| `--font-body` | DM Sans | Body text, buttons, nav |
| `--font-script` | Dancing Script | Signature, accent text |

**To swap a font:**
1. Go to [fonts.google.com](https://fonts.google.com), choose your font, and copy the `<link>` tag
2. Replace the existing Google Fonts `<link>` tag in the `<head>` of `index.html`
3. Update the matching CSS variable in `style.css`

---

### Text Content

Every piece of placeholder text is marked with an HTML comment directly above it:

```html
<!-- Replace with your headline -->
<h1>Your Product Name Here</h1>
```

Search for `<!-- Replace` in `index.html` to jump to every editable text block.

---

### Images

The template uses two types of image placeholders:

**Hero image (right side of hero section):**
```html
<!-- Find this block in the hero section and replace it: -->
<div class="hero-image-placeholder"> ... </div>

<!-- With your own image: -->
<img src="images/your-product.png" alt="Description of your product">
```

**Solution section preview:**
```html
<!-- Find .mockup-content and replace the inner div with: -->
<img src="images/your-preview.png" alt="Product preview">
```

**Tips for images:**
- Store your images in an `/images` folder inside the template folder
- Hero image: recommended minimum width of **600px**
- Use `.png` for screenshots, `.jpg` for photos
- Always fill in the `alt=""` attribute for accessibility

---

### CTA Buttons

Every CTA button has a placeholder `href="#"`. Replace each `#` with your actual link — a checkout URL, sign-up page, Gumroad link, etc.

```html
<a href="https://your-checkout-link.com" class="cta-button">Get Started</a>
```

---

## Section Guide

The page follows the **PAS framework** — a proven copywriting structure for landing pages. Here is what each section does and what to put in it.

---

### Navbar
The sticky top navigation bar. It starts transparent and picks up a frosted-glass effect when the user scrolls.

- **Logo:** Replace `YourLogo` text with your brand name, or swap it for an `<img>` tag
- **Links:** Each `href="#section-id"` scrolls to that section — update the link text to match your page
- **CTA pill:** The last nav link (`Get Started`) is styled as a gold button — update its `href` to your checkout link
- **To remove the navbar:** delete the entire `<nav>` block in `index.html`

---

### Hero
The first thing visitors see. Keep it tight: one bold headline, one supporting sentence, one primary action.

- **Eyebrow:** A small label above the headline — use it for positioning (`"For Freelancers"`, `"New in 2025"`)
- **Headline (`h1`):** State the transformation, not just the product name
- **Tagline (`.accent-text`):** One punchy italic line beneath the headline
- **Subheadline:** 1–2 sentences on the core benefit — focus on *what it does for the buyer*
- **Primary CTA:** Your main action button — link to checkout, download, or sign-up
- **Secondary CTA:** A softer option (`"See how it works ↓"`) for hesitant visitors
- **Trust badges:** Three short chips below the CTA — delivery info, guarantees, social proof
- **Hero image:** Replace the placeholder block with a screenshot, mockup, or photo of your product

---

### Logo Bar
An auto-scrolling marquee strip. Use it for client logos, press mentions, or stat highlights (`"500+ customers"`, `"Featured in Forbes"`).

- Replace the `<span>` text with your logos or stats
- To use logo images: replace `<span>Your Brand</span>` with `<img src="images/logo.png" alt="Brand">`
- To change scroll speed: find `.logo-bar-track` in `style.css` and adjust the `animation-duration` value
- **To remove:** delete the `.logo-bar` block in `index.html`

---

### Problem
PAS Step 1 — name the pain your buyer is feeling. Be specific. Use the language your customers use, not industry jargon.

- Lead with a question or bold statement that makes the reader feel seen
- 1–2 short paragraphs is enough — you are not solving it yet, just acknowledging it
- The CTA here is optional — some buyers are ready to act early

---

### Agitation
PAS Step 2 — amplify the consequences of inaction. Make the cost of doing nothing feel real.

- **Three cards:** Each card holds one specific pain point — keep them short and punchy
- **Pivot line:** The italic line at the bottom transitions from pain toward hope — this sets up the solution
- Replace the `✗` icons with any character or emoji that fits your brand

---

### Solution
PAS Step 3 — introduce your product or service as the clear answer. Focus on the transformation it delivers.

- Lead with the product name in the headline (use `<em>` tags for the italic gold styling)
- 1–2 sentences describing what it is and what it does
- **Solution mockup:** Replace the browser-chrome preview block with your actual product screenshot

---

### Features
What the buyer gets. Use benefit-led language — not just feature names.

> Instead of: *"Responsive design"*  
> Write: *"Looks perfect on every device, automatically"*

- The list renders in two columns on desktop, one column on mobile
- Add or remove `<li>` items as needed — the layout adapts automatically

---

### Social Proof
Testimonials, stats, or press quotes. Three cards is the ideal number — enough to convince, not enough to look padded.

**Three formats you can use:**

| Format | How to set it up |
|---|---|
| Testimonials | Replace quote text + author name, title, and avatar initial |
| Stats | Replace quote text with a large number + short descriptor |
| Logos | Replace the entire `.proof-item` content with an `<img>` tag |

- **Avatar:** Replace the letter inside `.proof-avatar` with `<img>` for real customer photos
- **To remove author info:** delete the `.proof-author` div inside each card

---

### Who It's For
A for/not-for contrast section. This increases trust by showing you know exactly who your offer is right for — and who it is not.

- **Left column (✦ This is for you if):** List the traits, goals, or situations that make someone a perfect buyer
- **Right column (✗ Not for you if):** List honest reasons someone should not buy — this builds credibility
- Keep each item to one sentence

---

### Creator Note
A personal, human touch. Write directly to your reader — share your story, your motivation, or a direct message to your buyer.

- Replace the paragraph with your own words
- Replace `— Your Name Here` with your name or brand signature
- **To remove this section:** delete the entire `<div class="creator-note">` block

---

### FAQ
An accordion — clicking a question smoothly opens its answer. Handles common objections before they stop a sale.

**Topics to cover:**
- Price and what is included
- How delivery or access works
- Refund or guarantee policy
- Technical requirements
- Who it is best suited for

**To add a new question:** copy one full `.faq-item` block and paste it below the last one. Update the question text and answer text inside.

---

### Final CTA
The closing section. Some buyers scroll straight to the bottom — this section should be able to close the deal on its own.

- Restate your single biggest benefit in the headline
- Keep the supporting paragraph to one sentence
- Use the same primary CTA link as the hero button
- **Trust line:** a short reassurance below the button — delivery speed, guarantee, no-risk statement

---

### Footer
Minimal footer with links and a copyright line.

- Replace `YourLogo` with your brand name
- Update the three link `href` values with real URLs (Privacy Policy, Terms, Contact)
- The copyright year updates automatically — no manual edits needed

---

## JavaScript Features

`main.js` powers three interactive features. Each can be disabled independently by commenting out its line at the bottom of the file.

| Feature | What it does | To disable |
|---|---|---|
| Scroll animations | Elements fade and slide into view as you scroll | Comment out `initScrollReveal()` |
| Staggered animations | Cards and list items animate in one-by-one | Comment out `initStaggeredAnimations()` |
| Navbar behavior | Frosted glass + active link highlight on scroll | Comment out `initNavbar()` |
| FAQ accordion | Smooth open/close answers | Comment out `initFaqAccordion()` |
| Footer year | Auto-updates the copyright year | Comment out `initFooterYear()` |

---

## Deploying Your Page

Once your edits are done, upload the entire folder to your web host. All three files must stay together — `index.html`, `style.css`, and `main.js`.

**Free hosting options:**
- [Netlify](https://netlify.com) — drag and drop your folder, live in seconds
- [GitHub Pages](https://pages.github.com) — free hosting directly from a GitHub repo
- [Tiiny.host](https://tiiny.host) — upload a zip, get a live URL instantly

**Using a custom domain:** point your domain to your host and update the page `<title>` and any absolute URLs in the HTML.

---

## Troubleshooting

**Scroll animations not working**  
Make sure `main.js` is in the same folder as `index.html` and the `<script src="main.js">` tag is present at the bottom of `index.html` just before `</body>`.

**Fonts not loading**  
The template loads fonts from Google Fonts and requires an internet connection to display them. They will not load if you are viewing the file completely offline with no connection. For fully offline use, download the font files and host them locally.

**Page looks unstyled**  
Ensure `style.css` is in the same folder as `index.html`. The link in the `<head>` must read `href="style.css"` exactly — check for typos or folder mismatches.

**Images not showing**  
Check that the file path in `src="..."` matches exactly — file names are case-sensitive on most web hosts. A file named `Hero.png` will not load if referenced as `hero.png`.

**Mobile menu not opening**  
The hamburger menu is CSS-driven. Ensure the `id="nav-checkbox"` on the `<input>` and `for="nav-checkbox"` on the `<label>` match exactly.

---

## License

This template is licensed for **single use** — one project per purchase. You may not resell, redistribute, or include this template in another product or bundle without written permission.

For multi-use or extended licensing, please get in touch.

---

*Thank you for your purchase. If you have any questions, feel free to reach out.*"# premium-landing-page-template" 
