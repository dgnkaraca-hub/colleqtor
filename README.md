# colleqtor

**Yaşayan Koleksiyon & Dijital Arşiv** — antika değerli nesneler, oyma ahşap figürler, heykelsel işler, dekoratif sanatlar, resim, çizim ve tekstiller için sessiz bir dijital galeri / arşiv arayüzü prototipi.

Bu bir e-ticaret sitesi değildir: satış dili yoktur; küratoryal bir arşiv ve "yazışmaya açık" bir temas noktası olarak tasarlanmıştır.

---

## Teknoloji

- **Vite 5** + **React 18** + **TypeScript**
- **react-router-dom 6** (istemci tarafı yönlendirme)
- **Tailwind CSS** (yapılandırılmış; tasarım büyük ölçüde `src/index.css` içindeki özel tasarım sistemiyle kuruludur)
- Yazı tipleri: **Cormorant Garamond** (başlık) + **Manrope** (gövde), Google Fonts üzerinden

## Gereksinimler

- **Node.js 18+** (öneri: 20 LTS) ve npm

## Komutlar

> Bu komutlar **macOS ve Windows'ta birebir aynıdır.**

```bash
npm install      # bağımlılıkları kurar (ilk seferde bir kez)
npm run dev      # geliştirme sunucusu -> http://localhost:5188
npm run build    # tip kontrolü + production derlemesi -> dist/
npm run preview  # build çıktısını yerelde önizler
npm run typecheck # yalnızca TypeScript tip kontrolü
```

Geliştirmeye başlamak için: `npm install` ardından `npm run dev` ve tarayıcıda `http://localhost:5188` adresini açın.

## Sayfalar / Rotalar

| Rota | Açıklama |
|------|----------|
| `/` | Anasayfa (hero, kategori şeridi, seçili nesneler, günlük, yazışma paneli) |
| `/koleksiyon` | Koleksiyon arşivi + filtre çubuğu |
| `/nesneler/:id` | Nesne detay sayfası (galeri, künye, açıklama, notlar) |
| `/gunluk` | Günlük / Journal listesi |
| `/yazisma` | Yazışma (iletişim) formu |
| `/resim-cizim` | "Resim & Çizim" kategorisine önfiltreli koleksiyon |
| `/hakkimizda` | Hakkımızda |
| `/styleguide` | Stil rehberi (logo, renk, tipografi, sosyal şablonlar) |

## Proje Yapısı

```
colleqtor/
├─ index.html              # Vite giriş HTML'i + Google Fonts
├─ public/
│  ├─ logo/                # marka SVG'leri (sembol + lockup) — her yerde <img> ile kullanılır
│  └─ favicon.svg
├─ src/
│  ├─ main.tsx             # React + Router montajı
│  ├─ App.tsx              # rota tanımları
│  ├─ index.css            # Tailwind direktifleri + tasarım sistemi
│  ├─ types.ts             # veri tipleri
│  ├─ data/                # objects.json · journal.json · categories.json
│  ├─ lib/                 # data.ts (tipli veri + sabitler) · objectMeta.ts
│  ├─ components/          # Header, Footer, Hero, ObjectCard, FilterBar, ... (16 bileşen)
│  └─ pages/               # 7 sayfa bileşeni
├─ vite.config.ts · tsconfig*.json · tailwind.config.js · postcss.config.js
└─ netlify.toml            # Netlify için SPA yönlendirmesi
```

## Görseller

Şu an nesne ve günlük görselleri, kategoriye göre tonlanan **placeholder** bloklarıyla (marka sembolü filigranlı) temsil edilir. Gerçek fotoğraflarla değiştirmek için:

1. Fotoğrafları `public/` altına ekleyin (ör. `public/objects/<id>.jpg`).
2. `src/components/Placeholder.tsx` ve `ImageGallery.tsx` içindeki placeholder'ı `<img src=...>` ile değiştirin; nesne kaydındaki `imageKey` alanını referans olarak kullanabilirsiniz.

## Yayınlama (Deploy)

- **Netlify:** Depoyu bağlayın; `netlify.toml` zaten hazır (`build` komutu + `dist` yayın klasörü + SPA fallback). Ya da `npm run build` sonrası `dist/` klasörünü Netlify'a sürükleyip bırakın.
- **GitHub Pages:** Alt yol (`/<repo-adi>/`) altında yayınlıyorsanız `vite.config.ts` içinde `base: "/<repo-adi>/"` ayarlayın ve SPA için bir `404.html` fallback'i ekleyin.

## Notlar

- Tüm kod, tanımlayıcılar ve yorumlar İngilizce; marka/arayüz içeriği tasarım gereği Türkçedir.
- Marka sembolü tek ve aynıdır; farklı varyasyon üretilmez. Açık zeminde bronz, koyu zeminde krem/bronz çalışır.
