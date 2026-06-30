export type StatusLabel = "İnceleme talebi" | "Yazışmaya açık";

export interface ArchiveObject {
  id: string;
  title: string;
  category: string;
  origin: string;
  material: string;
  period: string;
  dimensions?: string;
  condition?: string;
  provenance?: string;
  statusLabel: StatusLabel;
  shortDescription: string;
  imageKey: string;
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
