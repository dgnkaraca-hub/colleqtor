import type { ReactNode } from "react";
import { FilterIcon, Chevron } from "./Icons";

export interface Filters {
  q: string;
  material: string;
  origin: string;
  period: string;
  technique: string;
  category: string;
  status: string;
  sort: string;
}

interface Props {
  filters: Filters;
  onChange: (key: keyof Filters, value: string) => void;
  materials: string[];
  origins: string[];
  periods: string[];
  categories: { label: string; value: string }[];
}

const STATUSES = ["İnceleme talebi", "Yazışmaya açık"];

function Pill({
  icon,
  label,
  value,
  onChange,
  children,
}: {
  icon: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="filter-pill">
      <FilterIcon name={icon} />
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
      <Chevron />
    </div>
  );
}

export default function FilterBar({
  filters,
  onChange,
  materials,
  origins,
  periods,
  categories,
}: Props) {
  return (
    <div className="filter-bar">
      <Pill icon="material" label="Malzemeye göre filtrele" value={filters.material} onChange={(v) => onChange("material", v)}>
        <option value="">MALZEME</option>
        {materials.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Pill>
      <Pill icon="region" label="Kökene göre filtrele" value={filters.origin} onChange={(v) => onChange("origin", v)}>
        <option value="">KÖKEN</option>
        {origins.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </Pill>
      <Pill icon="period" label="Döneme göre filtrele" value={filters.period} onChange={(v) => onChange("period", v)}>
        <option value="">DÖNEM</option>
        {periods.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </Pill>
      <Pill icon="category" label="Kategoriye göre filtrele" value={filters.category} onChange={(v) => onChange("category", v)}>
        <option value="">KATEGORİ</option>
        {categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </Pill>
      <Pill icon="technique" label="Durumuna göre filtrele" value={filters.status} onChange={(v) => onChange("status", v)}>
        <option value="">DURUM</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Pill>
      <Pill icon="sort" label="Sıralama" value={filters.sort} onChange={(v) => onChange("sort", v)}>
        <option value="new">SIRALAMA / En Yeni</option>
        <option value="az">SIRALAMA / İsme Göre (A–Z)</option>
      </Pill>
    </div>
  );
}
