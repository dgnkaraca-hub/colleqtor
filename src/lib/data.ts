import objects from "../data/objects.json";
import journal from "../data/journal.json";
import categories from "../data/categories.json";
import type { ArchiveObject, JournalEntry, Category } from "../types";

export const OBJECTS = objects as unknown as ArchiveObject[];
export const JOURNAL = journal as unknown as JournalEntry[];
export const CATEGORIES = categories as unknown as Category[];

/** placeholder tone class per category (object-photography stand-ins) */
export const CAT_TONE: Record<string, string> = {
  "Ahşap Oymacılık": "ph-walnut",
  "Heykelsel Nesneler": "ph-walnut2",
  "Antika & Dekoratif Sanatlar": "ph-sand",
  "Resim & Çizim": "ph-paper",
  "Tekstil / El Sanatları": "ph-textile",
  "Özel Koleksiyon": "ph-charcoal",
};

/** map a SMALL-CAPS category label back to the data category string */
export const CATEGORY_FROM_LABEL: Record<string, string> = {
  "AHŞAP OYMACILIK": "Ahşap Oymacılık",
  "HEYKELSEL NESNELER": "Heykelsel Nesneler",
  "ANTİKA & DEKORATİF SANATLAR": "Antika & Dekoratif Sanatlar",
  "RESİM & ÇİZİM": "Resim & Çizim",
  "TEKSTİL / EL SANATLARI": "Tekstil / El Sanatları",
  "ÖZEL KOLEKSİYON": "Özel Koleksiyon",
};

export const NAV = [
  { label: "KOLEKSİYON", to: "/koleksiyon", key: "koleksiyon" },
  { label: "NESNELER", to: "/koleksiyon", key: "nesneler" },
  { label: "GÜNLÜK / JOURNAL", to: "/gunluk", key: "gunluk" },
  { label: "HAKKIMIZDA", to: "/hakkimizda", key: "hakkimizda" },
  { label: "RESİM & ÇİZİM", to: "/resim-cizim", key: "resim-cizim" },
  { label: "YAZIŞMA", to: "/yazisma", key: "yazisma" },
];
