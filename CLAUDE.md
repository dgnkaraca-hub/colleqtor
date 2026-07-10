# colleqtor — project memory

Curatorial "living collection & digital archive" site for antiques, carved
wood figures, sculptural works, decorative arts, drawings and textiles.
It must feel like a museum catalogue / private archive — **never** like a
marketplace.

## Hard rules

- **Port 5188, fixed.** `npm run dev` serves http://localhost:5188 with
  `strictPort` (vite.config.ts). Never move to another port.
- **Turkish UI, English code.** All user-facing copy is Turkish; all code,
  identifiers, comments and commit messages are English.
- **No sales language.** Forbidden: "sepete ekle", "satın al", "kampanya",
  "indirim", "mağaza" and equivalents. Use archive vocabulary instead:
  nesne, arşiv kaydı, seçki, köken, dönem, provenans, inceleme talebi,
  iletişime açık, koleksiyon notu.
- **Never read, print or modify `.env` contents.**
- Brand identity is locked: lowercase "colleqtor" name, warm archive
  palette, spiral SVG logo always via `<img src="/logo/...">` (never
  redrawn in CSS), the styleguide page, the quiet Turkish archival tone.

## Stack

Vite 5 · React 18 · TypeScript · react-router-dom 6 · Tailwind.
`npm run dev` / `npm run build` (tsc --noEmit + vite build) /
`npm run typecheck`.

## Design system

All styling lives in `src/index.css`: design tokens under `:root`
(`--cq-*` colors, radii, fonts) plus hand-written component styles.
Headings: Cormorant Garamond. Body: Manrope (Google Fonts, index.html).
Motion: scroll reveals via `src/lib/useReveal.ts` + `[data-reveal]` CSS;
everything respects `prefers-reduced-motion`.

## Data layer

- `src/data/objects.json` — archive records (schema: `ArchiveObject` in
  `src/types.ts`)
- `src/data/journal.json` — journal entries
- `src/data/categories.json` — category strip data
- `src/lib/data.ts` — typed exports, NAV, category mappings
- `src/lib/objectMeta.ts` — builds detail-page meta/description/notes
  from data

## Routes (src/App.tsx)

| Path | Page |
|------|------|
| `/` | HomePage |
| `/koleksiyon` | CollectionPage (search + filters) |
| `/nesneler/:id` | ObjectDetailPage |
| `/gunluk` | JournalPage |
| `/iletisim` | InquiryPage (`/yazisma` redirects here) |
| `/resim-cizim` | CollectionPage preset to "Resim & Çizim" |
| `/hakkimizda` | AboutPage |
| `/styleguide` | StyleguidePage |
