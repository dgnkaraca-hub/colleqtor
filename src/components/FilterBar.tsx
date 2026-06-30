import type { ReactNode } from "react";
import { FilterIcon, Chevron } from "./Icons";

export interface Filters {
  material: string;
  origin: string;
  period: string;
  technique: string;
  category: string;
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

function Pill({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="filter-pill">
      <FilterIcon name={icon} />
      {children}
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
      <Pill icon="material">
        <select value={filters.material} onChange={(e) => onChange("material", e.target.value)}>
          <option value="">MALZEME</option>
          {materials.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Pill>
      <Pill icon="region">
        <select value={filters.origin} onChange={(e) => onChange("origin", e.target.value)}>
          <option value="">BÖLGE</option>
          {origins.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Pill>
      <Pill icon="period">
        <select value={filters.period} onChange={(e) => onChange("period", e.target.value)}>
          <option value="">DÖNEM</option>
          {periods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Pill>
      <Pill icon="technique">
        <select value={filters.technique} onChange={(e) => onChange("technique", e.target.value)}>
          <option value="">TEKNİK</option>
          <option value="Oyma">Oyma</option>
          <option value="Suluboya">Suluboya</option>
          <option value="Mürekkep">Mürekkep</option>
          <option value="Dokuma">Dokuma</option>
        </select>
      </Pill>
      <Pill icon="category">
        <select value={filters.category} onChange={(e) => onChange("category", e.target.value)}>
          <option value="">KATEGORİ</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Pill>
      <Pill icon="sort">
        <select value={filters.sort} onChange={(e) => onChange("sort", e.target.value)}>
          <option value="new">SIRALAMA / En Yeni</option>
          <option value="az">SIRALAMA / İsme Göre</option>
        </select>
      </Pill>
    </div>
  );
}
