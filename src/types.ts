export type StatusLabel = "İnceleme talebi" | "Yazışmaya açık";

/**
 * A single object image. `src` points to a real photograph under /public
 * (e.g. "/objects/bodhisattva-01.jpg"). When `src` is omitted the UI falls
 * back to the branded placeholder, so records stay valid before photography.
 */
export interface ObjectImage {
  src?: string;
  alt: string;
  caption?: string;
}

/**
 * Archive object record. Shaped so it can later be served from a CMS or
 * database with minimal change. Core fields are required; descriptive and
 * media fields are optional so a record can be published incrementally.
 */
export interface ArchiveObject {
  id: string;
  slug: string;
  title: string;
  category: string;
  origin: string;
  region?: string;
  material: string;
  period: string;
  estimatedYear?: string;
  dimensions?: string;
  condition?: string;
  provenance?: string;
  statusLabel: StatusLabel;
  shortDescription: string;
  /** Long description as discrete paragraphs. */
  longDescription?: string[];
  collectorNote?: string;
  images?: ObjectImage[];
  /** Legacy placeholder tone key (used when an image has no real `src`). */
  imageKey?: string;
  tags?: string[];
  featured?: boolean;
  availableForInquiry?: boolean;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageKey: string;
}

export interface Category {
  label: string;
  count: string;
  slug: string;
}
