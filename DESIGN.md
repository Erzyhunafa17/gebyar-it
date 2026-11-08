# Resend — Style Reference (Dual Theme: Dark & Low-Glare Light)
> black velvet with violet neon (Dark) · matte paper with cool stone surfaces (Light)

**Theme:** Dual (`dark` default, `light` low-glare surface hierarchy)

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Resend lives in a near-total darkness in **Dark Mode** — pure black canvas, hairline graphite borders, and white-on-black typography that feels like reading text printed on matte glass. In **Light Mode**, the design avoids painful "white-on-white" glare by pairing a soft alabaster paper canvas (`#fafafa`) with distinct cool-stone card surfaces (`#f0f2f5`), elevated inner white badges (`#ffffff`), and recessed slate-tinted terminal blocks (`#eaedf1`).

The hero is anti-decorative: a single large serif headline at 96px Domaine next to a 3D geometric object, with no gradient wash and no marketing illustration. The brand mark is a tight violet (`#9281f7` in dark, `#6d28d9` in light) that appears in email-address strings, status icons, and code samples — never on buttons. A monospaced font (Commit Mono) carries the developer identity through every code block, badge, and inline label, making the page read like a terminal wrapped in a luxury interface. Components are sharp-cornered or gently rounded (6px / 16px), low-elevation, and rely on 1px borders rather than heavy shadows to separate layers. Motion is restrained but expressive: fade-and-slide hero text, subtle WebGL rotation on the hero cube, and short 150ms ease-out transitions on hover.

---

## Tokens — Colors (Dual-Theme Semantic Mapping)

| Name | Dark Value (`:root`) | Light Value (`.light` / `[data-theme="light"]`) | Token | Role |
|------|----------------------|------------------------------------------------|-------|------|
| Void Black / Paper Canvas | `#000000` | `#fafafa` | `--color-void-black` | Primary page background canvas — pure black in dark, anti-glare alabaster in light |
| Surface Card | `#000000` | `#f0f2f5` | `--surface-card` | Feature cards, lab cards, and testimonial containers — separated by tone in light mode so cards are never white-on-white |
| Surface Card Hover | `#0b0e14` | `#e6e9ef` | `--surface-card-hover` | Interactive hover state for clickable cards and elevated panels |
| Surface Inner Pill | `#0b0e14` | `#ffffff` | `--surface-inner` | Badges, status pills, and inner sub-cards inside a card (`#ffffff` on `#f0f2f5` creates crisp inverted depth in light mode) |
| Surface Terminal | `#000000` | `#eaedf1` | `--surface-terminal` | Code block and interactive CLI body surface |
| Surface Terminal Header | `#0b0e14` | `#dfe3e8` | `--surface-terminal-header` | Top bar of terminal/code windows (housing the traffic-light dots and bash title) |
| Graphite Hairline | `#292d30` | `#d5d8de` | `--color-graphite-hairline` | 1px borders on cards, inputs, buttons, code blocks, dividers — defines every layer separation |
| White / Ink Black | `#ffffff` | `#090d16` | `--color-white` | Primary headings, hero text, primary button labels, active icon fills |
| Bone White / Slate Body | `#f0f0f0` | `#1f2937` | `--color-bone-white` | Body text, secondary headings, stroke outlines on icons — the primary reading color |
| Ash Gray / Muted Zinc | `#a1a4a5` | `#4b5563` | `--color-ash-gray` | Muted body text, badge labels, icon strokes — third-tier text and metadata |
| Smoke Gray | `#abafb4` | `#6b7280` | `--color-smoke-gray` | Link color, inactive button text, supporting captions — fourth-tier text |
| Iron | `#6e727a` | `#9ca3af` | `--color-iron` | Subtle decorative strokes, disabled states, low-emphasis borders |
| Charcoal | `#464a4d` | `#cbd5e1` | `--color-charcoal` | Background canvas watermarks, inline muted markers — text that recedes into the surface |
| Iris Violet | `linear-gradient(to right bottom in oklab, rgb(146, 129, 247) 0%, rgb(154, 84, 220) 100%)` | `linear-gradient(to right bottom in oklab, rgb(109, 40, 217) 0%, rgb(126, 34, 206) 100%)` | `--gradient-iris-violet` | Diagonal violet-to-magenta gradient on icon containers and brand badges |
| Iris Violet Solid | `#9281f7` | `#6d28d9` | `--color-iris-violet` | Violet text accent for links, tags, typewriter hero text, and emphasized code strings |
| Iris Violet Glow | `#baa7ff` | `#7c3aed` | `--color-iris-violet-glow` | Secondary violet accent for syntax highlighting and hover states |
| Signal Blue | `#3b9eff` | `#0284c7` | `--color-signal-blue` | Blue action color for JSON keys, selected navigation states, and focused conversion moments |
| Sky Blue | `#70b8ff` | `#0369a1` | `--color-sky-blue` | Blue text accent for links, tags, and filenames |
| Pulse Green | `#3ad389` | `#059669` | `--color-pulse-green` | Green accent for active lab indicators, terminal cursors, and success values |
| Alarm Red | `#ff9592` | `#dc2626` | `--color-alarm-red` | Red text accent for errors and bounced states |
| Crimson | `#ff6465` | `#e11d48` | `--color-crimson` | Red wash for highlight backgrounds and soft emphasis |
| Amber | `#ffca16` | `#d97706` | `--color-amber` | Yellow text accent for warnings and highlights |
| Amber Glow | `#ffd60a` | `#b45309` | `--color-amber-glow` | Yellow wash for highlight backgrounds |
| Surface Gradient | `linear-gradient(rgb(27, 27, 27), rgb(3, 3, 3))` | `linear-gradient(180deg, #f4f5f7 0%, #eaedf1 100%)` | `--gradient-surface-gradient` | Subtle card-to-canvas surface lift — used in elevated cards and panels |

---

## Tokens — Typography

### Inter — Body copy, UI labels, navigation, buttons, links. The workhorse — appears 1280 times across every non-code surface. · `--font-inter`
- **Substitute:** Inter (Google Fonts), Söhne, system-ui
- **Weights:** 400, 500, 600
- **Sizes:** 12px, 14px, 16px, 18px, 24px
- **Line height:** 1.00, 1.33, 1.43, 1.50, 1.60
- **Role:** Body copy, UI labels, navigation, buttons, links. The workhorse — appears 1280 times across every non-code surface.

### Domaine — Hero display type — weight 400 at 96px with -0.01em tracking creates an editorial, almost-printed feel. Only used twice on the entire page for the largest hero statement. · `--font-domaine`
- **Substitute:** GT Sectra, Tiempos Headline, Playfair Display
- **Weights:** 400
- **Sizes:** 77px, 96px
- **Line height:** 1.00
- **Letter spacing:** -0.01em
- **OpenType features:** `"ss01", "ss04", "ss11"`
- **Role:** Hero display type — weight 400 at 96px with -0.01em tracking creates an editorial, almost-printed feel. Only used twice on the entire page for the largest hero statement.

### aBC Favorit — Section headlines and sub-headlines. The 56px weight-400 with -0.05em tracking is the signature — extreme negative tracking on a geometric sans creates a compressed, confident display feel that contrasts the editorial Domaine hero. · `--font-abc-favorit`
- **Substitute:** Inter Display, Söhne Breit, GT America
- **Weights:** 400, 500
- **Sizes:** 14px, 16px, 20px, 56px
- **Line height:** 1.00, 1.20, 1.30, 1.50
- **Letter spacing:** -0.05em at 56px, +0.025em at 14px
- **OpenType features:** `"ss01", "ss04", "ss11"; "ss01", "ss03", "ss04"`
- **Role:** Section headlines and sub-headlines. The 56px weight-400 with -0.05em tracking is the signature — extreme negative tracking on a geometric sans creates a compressed, confident display feel that contrasts the editorial Domaine hero.

### Commit Mono — Code blocks, inline code, terminal-style badges, API labels. Monospaced presence is the developer's identity signal — appears 814 times, rivaling Inter. · `--font-commit-mono`
- **Substitute:** JetBrains Mono, Berkeley Mono, IBM Plex Mono
- **Weights:** 400
- **Sizes:** 12px, 14px, 16px
- **Line height:** 1.33, 1.43, 1.50
- **Role:** Code blocks, inline code, terminal-style badges, API labels. Monospaced presence is the developer's identity signal — appears 814 times, rivaling Inter.

### Helvetica — Helvetica — detected in extracted data but not described by AI · `--font-helvetica`
- **Weights:** 400, 600, 700
- **Sizes:** 14px
- **Line height:** 1, 1.71
- **Role:** Helvetica — detected in extracted data but not described by AI

### -apple-system — -apple-system — detected in extracted data but not described by AI · `--font-apple-system`
- **Weights:** 400
- **Sizes:** 14px
- **Line height:** 1.5, 1.55
- **OpenType features:** `"liga" 0`
- **Role:** -apple-system — detected in extracted data but not described by AI

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| caption | — | — | 12px | 1.33 | 0px | `--text-caption` |
| body-sm | — | — | 14px | 1.43 | 0px | `--text-body-sm` |
| body | — | — | 16px | 1.5 | 0px | `--text-body` |
| subheading | — | — | 20px | 1 | 0px | `--text-subheading` |
| heading-sm | — | — | 24px | 1.5 | 0px | `--text-heading-sm` |
| heading | — | — | 56px | 1.2 | -2.8px | `--text-heading` |
| heading-lg | — | — | 77px | 1 | -0.77px | `--text-heading-lg` |
| display | — | — | 96px | 1 | -0.96px | `--text-display` |

---

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 96 | 96px | `--spacing-96` |
| 104 | 104px | `--spacing-104` |
| 144 | 144px | `--spacing-144` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 16px |
| badges | 6px |
| inputs | 6px |
| buttons | 6px |
| large-panels | 24px |

### Shadows

| Name | Dark Value | Light Value | Token |
|------|------------|-------------|-------|
| subtle | `rgba(176, 199, 217, 0.145) 0px 0px 0px 1px` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.7), 0 1px 2px 0 rgba(9, 13, 22, 0.05)` | `--shadow-subtle` |
| subtle-2 | `rgb(0, 0, 0) 0px 0px 0px 8px` | `rgba(229, 231, 235, 0.6) 0px 0px 0px 8px` | `--shadow-subtle-2` |
| subtle-3 | `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px` | `rgba(9, 13, 22, 0.06) 0px 2px 6px -1px, rgba(9, 13, 22, 0.04) 0px 1px 2px -1px` | `--shadow-subtle-3` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16px

---

## Components (Dual-Theme Specifications)

### Primary & Secondary Buttons (Ghost / Tactile Surface)
**Role:** Default CTA — 'Get started', 'Jelajahi Laboratorium', 'Tentang Prodi'

- **Dark Mode:** Transparent background, 1px border in `#292d30`, white text (`#ffffff`), 6px radius, 12px 16px padding. Hover increases border opacity to white.
- **Light Mode:** Secondary ghost button uses `--surface-inner` (`#ffffff`) or `--surface-card` (`#f0f2f5`), 1px border in `#d5d8de`, ink text (`#090d16`), with `--shadow-subtle`. Hover shifts background to `#e6e9ef` and border to `#9ca3af`. Primary CTA can optionally use solid `#090d16` fill with `#ffffff` text for clear visual anchoring.

### Nav Link Button
**Role:** Top navigation items — 'Features', 'Company', 'Resources'

Transparent background, no border, text color `--color-bone-white` at 14px Inter weight 400, 0px padding. Underline or color shift on hover to `--color-white`.

### Text Link with Chevron
**Role:** Inline CTAs — 'Documentation', 'Lihat Detail >'

No background, no border, `--color-white` or `--color-bone-white` text at 16px Inter, trailing chevron icon in same color. Restrained, terminal-like.

### Hero Announcement Pill
**Role:** 'Announcing Resend Forward >' badge above hero headline

Background `--surface-card` (`#000000` in dark, `#f0f2f5` in light), 1px border in `--color-graphite-hairline`, `--color-bone-white` text at 14px Inter, 9999px (pill) radius, 6px 12px padding. Small chromatic accent chevron.

### Section Card & Lab Specialization Card
**Role:** Content cards in feature sections, specialization lab grid (SE/RPL, CSN, GIT, KERIS), and testimonial grid

- **Dark Mode:** Black background (`#000000`), 1px border in `#292d30`, 16px radius, 32px padding, no shadow. Cards rely on the border to separate from the black canvas.
- **Light Mode (Anti-Glare Fix):** Uses `--surface-card` (`#f0f2f5`) or `--gradient-surface-gradient` (`linear-gradient(180deg, #f4f5f7 0%, #eaedf1 100%)`) sitting on the `#fafafa` page canvas, paired with a 1px border in `#d5d8de` and `--shadow-subtle` (crisp 1px top inner white highlight). Inner metadata boxes (such as 'KEPALA LAB' or 'Aktif' badge) use `--surface-inner` (`#ffffff`) with a `#d5d8de` border to create clean inverted layering without ever blending into the page background.

### Testimonial Card
**Role:** Customer quote cards in 'Beyond expectations' section

Uses `--surface-card`, 1px `--color-graphite-hairline` border, 16px radius, 24px padding. Contains quoted text at 16px Inter, avatar (32px circle), name at 14px weight 500 in `--color-bone-white`, role/title in `--color-ash-gray`.

### Code Block / Terminal Window
**Role:** Developer-facing code snippets, `prodi-info.json`, and interactive CLI (`lab-recommender`)

- **Dark Mode:** `#000000` background, 1px `#292d30` border, 16px radius, Commit Mono at 12-14px.
- **Light Mode:** Body uses recessed cool stone `--surface-terminal` (`#eaedf1`) with a darker top title bar `--surface-terminal-header` (`#dfe3e8`) separated by a 1px `#d5d8de` bottom border. Syntax highlighting automatically shifts to deeper high-contrast hues (`#6d28d9` for strings/keywords, `#0284c7` for keys/filenames, `#059669` for success values, `#dc2626` for errors) so code never looks washed out.

### Logo Grid
**Role:** Customer or partner logos

Inline-display logos centered in a 4-column grid with 60px row gap. No card wrappers, no labels.

### Status Indicator Dot
**Role:** Email or Lab operational status — delivered, active, operational

2-3px diameter filled dot, no border, paired with label text in Commit Mono. Uses `--color-pulse-green` (`#3ad389` in dark, `#059669` in light) for operational/delivered status.

### Email Address & CLI Identifier Badge
**Role:** 'from:' addresses, `$ WHOAMI`, and CLI commands

No background (or subtle `--surface-inner` pill in light mode), Commit Mono at 12-14px, text color `--color-iris-violet` (`#9281f7` in dark, `#6d28d9` in light).

### Icon Container
**Role:** Rounded-square containers for lab or app icons

32x32 or 48x48 rounded square (12px–16px radius). In light mode, uses `--surface-inner` (`#ffffff`) with 1px `#d5d8de` border or subtle violet tint (`#ede9fe`) with `--color-iris-violet` stroke icon inside.

---

## Do's and Don'ts

### Do
- **Dark Mode:** Use pure `#000000` as the page canvas and separate UI layers with 1px borders in `#292d30`.
- **Light Mode:** Always differentiate the **Canvas (`#fafafa`)** from **Card Surfaces (`#f0f2f5`)** and **Terminal Windows (`#eaedf1`)**. Place pure `#ffffff` elements *inside* `#f0f2f5` cards (inverted inner elevation) for badges, pills, and interactive buttons.
- Use Commit Mono for any code, CLI prompt (`$ WHOAMI`), email address, or developer-facing string. Keep Inter for prose and UI chrome.
- Use 6px radius for buttons, badges, inputs. Use 16px radius for cards and code windows.
- Let Iris Violet (`--color-iris-violet`) mark code strings and developer identifiers. Ensure it darkens to `#6d28d9` in light mode to pass WCAG contrast ratios.
- Apply tight `-0.05em` letter-spacing at 56px display sizes and `-0.01em` at 96px hero sizes.

### Don't
- **Don't use pure `#ffffff` cards on a pure `#ffffff` background in Light Mode.** White-on-white surfaces cause visual fatigue and flatten the layout hierarchy.
- Don't use neon pastel syntax colors (`#baa7ff`, `#70b8ff`, `#3ad389`) directly on light backgrounds — always map them to their high-contrast light-mode tokens (`#6d28d9`, `#0284c7`, `#059669`).
- Don't use heavy, blurry drop shadows for elevation. Rely on 1px borders (`--color-graphite-hairline`), surface tone contrast (`--surface-card`), and a 1px inner top highlight (`--shadow-subtle`).
- Don't use multiple border radii on a single surface. Cards are 16px, buttons/badges/inputs are 6px.

---

## Surfaces Hierarchy

| Level | Name | Dark Value | Light Value | Purpose |
|-------|------|------------|-------------|---------|
| 0 | Void / Canvas | `#000000` | `#fafafa` | Primary page canvas (low-glare in light mode) |
| 1 | Card Surface | `#000000` | `#f0f2f5` | Standard cards, lab cards, feature containers |
| 2 | Terminal / Recessed | `#0b0e14` | `#eaedf1` | Code windows, CLI blocks, recessed wells |
| 3 | Inner Elevated Pill | `#14171f` | `#ffffff` | Badges, inner callouts, and interactive controls inside cards |
| 4 | Hairline Border | `#292d30` | `#d5d8de` | 1px structural border defining all surfaces |
| 5 | Backdrop Blur | `#000000f2` | `#fafafae0` | Sticky navigation bar and modal overlays with `backdrop-filter: blur(20px)` |

---

## Quick Start

### CSS Custom Properties (Dual Theme Ready)

```css
:root {
  /* Colors & Surfaces — Dark Mode (Default) */
  --color-void-black: #000000;
  --surface-void: #000000;
  --surface-card: #000000;
  --surface-card-hover: #0b0e14;
  --surface-inner: #0b0e14;
  --surface-terminal: #000000;
  --surface-terminal-header: #0b0e14;
  --color-graphite-hairline: #292d30;
  --surface-graphite: #292d30;
  --surface-surface-lift: #0b0e14;
  --surface-backdrop-blur: rgba(0, 0, 0, 0.92);

  /* Typography Colors — Dark Mode */
  --color-white: #ffffff;
  --color-bone-white: #f0f0f0;
  --color-ash-gray: #a1a4a5;
  --color-smoke-gray: #abafb4;
  --color-iron: #6e727a;
  --color-charcoal: #464a4d;

  /* Accents — Dark Mode */
  --color-iris-violet: #9281f7;
  --gradient-iris-violet: linear-gradient(to right bottom in oklab, rgb(146, 129, 247) 0%, rgb(154, 84, 220) 100%);
  --color-iris-violet-glow: #baa7ff;
  --color-signal-blue: #3b9eff;
  --color-sky-blue: #70b8ff;
  --color-pulse-green: #3ad389;
  --color-alarm-red: #ff9592;
  --color-crimson: #ff6465;
  --color-amber: #ffca16;
  --color-amber-glow: #ffd60a;
  --color-surface-gradient: #0b0e14;
  --gradient-surface-gradient: linear-gradient(rgb(27, 27, 27), rgb(3, 3, 3));

  /* Typography — Font Families */
  --font-inter: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-domaine: 'Domaine', Georgia, Cambria, "Times New Roman", Times, serif;
  --font-abc-favorit: 'aBC Favorit', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-commit-mono: 'Commit Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-helvetica: 'Helvetica', ui-sans-serif, system-ui, sans-serif;
  --font-apple-system: '-apple-system', ui-sans-serif, system-ui, sans-serif;

  /* Typography — Scale */
  --text-caption: 12px;
  --leading-caption: 1.33;
  --tracking-caption: 0px;
  --text-body-sm: 14px;
  --leading-body-sm: 1.43;
  --tracking-body-sm: 0px;
  --text-body: 16px;
  --leading-body: 1.5;
  --tracking-body: 0px;
  --text-subheading: 20px;
  --leading-subheading: 1;
  --tracking-subheading: 0px;
  --text-heading-sm: 24px;
  --leading-heading-sm: 1.5;
  --tracking-heading-sm: 0px;
  --text-heading: 56px;
  --leading-heading: 1.2;
  --tracking-heading: -2.8px;
  --text-heading-lg: 77px;
  --leading-heading-lg: 1;
  --tracking-heading-lg: -0.77px;
  --text-display: 96px;
  --leading-display: 1;
  --tracking-display: -0.96px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-104: 104px;
  --spacing-144: 144px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 96px;
  --card-padding: 32px;
  --element-gap: 16px;

  /* Border Radius */
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;

  /* Named Radii */
  --radius-cards: 16px;
  --radius-badges: 6px;
  --radius-inputs: 6px;
  --radius-buttons: 6px;
  --radius-large-panels: 24px;

  /* Shadows */
  --shadow-subtle: rgba(176, 199, 217, 0.145) 0px 0px 0px 1px;
  --shadow-subtle-2: rgb(0, 0, 0) 0px 0px 0px 8px;
  --shadow-subtle-3: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
}

/* ==========================================================================
   LIGHT MODE OVERRIDES — Low-Glare Paper Canvas & Cool-Stone Cards
   ========================================================================== */
:root.light,
.light,
[data-theme="light"] {
  /* Surfaces — Distinct separation between Canvas (#fafafa) and Cards (#f0f2f5) */
  --color-void-black: #fafafa;
  --surface-void: #fafafa;
  --surface-card: #f0f2f5;
  --surface-card-hover: #e6e9ef;
  --surface-inner: #ffffff;
  --surface-terminal: #eaedf1;
  --surface-terminal-header: #dfe3e8;
  --color-graphite-hairline: #d5d8de;
  --surface-graphite: #d5d8de;
  --surface-surface-lift: #f0f2f5;
  --surface-backdrop-blur: rgba(250, 250, 250, 0.88);

  /* Typography Colors — High-Contrast Ink & Slate */
  --color-white: #090d16;
  --color-bone-white: #1f2937;
  --color-ash-gray: #4b5563;
  --color-smoke-gray: #6b7280;
  --color-iron: #9ca3af;
  --color-charcoal: #cbd5e1;

  /* Accents — Deepened for crisp legibility on light surfaces */
  --color-iris-violet: #6d28d9;
  --gradient-iris-violet: linear-gradient(to right bottom in oklab, rgb(109, 40, 217) 0%, rgb(126, 34, 206) 100%);
  --color-iris-violet-glow: #7c3aed;
  --color-signal-blue: #0284c7;
  --color-sky-blue: #0369a1;
  --color-pulse-green: #059669;
  --color-alarm-red: #dc2626;
  --color-crimson: #e11d48;
  --color-amber: #d97706;
  --color-amber-glow: #b45309;
  --color-surface-gradient: #f0f2f5;
  --gradient-surface-gradient: linear-gradient(180deg, #f4f5f7 0%, #eaedf1 100%);

  /* Tactile Bevel & Micro-Shadow for Light Cards */
  --shadow-subtle: inset 0 1px 0 0 rgba(255, 255, 255, 0.75), 0 1px 2px 0 rgba(9, 13, 22, 0.05);
  --shadow-subtle-2: rgba(229, 231, 235, 0.6) 0px 0px 0px 8px;
  --shadow-subtle-3: rgba(9, 13, 22, 0.06) 0px 2px 6px -1px, rgba(9, 13, 22, 0.04) 0px 1px 2px -1px;
}
```

### Tailwind v4 (`@theme` Configuration)

```css
@theme {
  /* Semantic Surface & Color Tokens (auto-switches with :root / .light) */
  --color-void-black: var(--color-void-black);
  --color-surface-card: var(--surface-card);
  --color-surface-card-hover: var(--surface-card-hover);
  --color-surface-inner: var(--surface-inner);
  --color-surface-terminal: var(--surface-terminal);
  --color-surface-terminal-header: var(--surface-terminal-header);
  --color-graphite-hairline: var(--color-graphite-hairline);
  --color-white: var(--color-white);
  --color-bone-white: var(--color-bone-white);
  --color-ash-gray: var(--color-ash-gray);
  --color-smoke-gray: var(--color-smoke-gray);
  --color-iron: var(--color-iron);
  --color-charcoal: var(--color-charcoal);
  --color-iris-violet: var(--color-iris-violet);
  --color-iris-violet-glow: var(--color-iris-violet-glow);
  --color-signal-blue: var(--color-signal-blue);
  --color-sky-blue: var(--color-sky-blue);
  --color-pulse-green: var(--color-pulse-green);
  --color-alarm-red: var(--color-alarm-red);
  --color-crimson: var(--color-crimson);
  --color-amber: var(--color-amber);
  --color-amber-glow: var(--color-amber-glow);
  --color-surface-gradient: var(--color-surface-gradient);

  /* Typography */
  --font-inter: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-domaine: 'Domaine', Georgia, Cambria, "Times New Roman", Times, serif;
  --font-abc-favorit: 'aBC Favorit', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-commit-mono: 'Commit Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-104: 104px;
  --spacing-144: 144px;

  /* Border Radius */
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;

  /* Shadows */
  --shadow-subtle: var(--shadow-subtle);
  --shadow-subtle-2: var(--shadow-subtle-2);
  --shadow-subtle-3: var(--shadow-subtle-3);
}
```
