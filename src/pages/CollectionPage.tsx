import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import type { Filters } from "../components/FilterBar";
import ObjectGrid from "../components/ObjectGrid";
import Placeholder from "../components/Placeholder";
import { OBJECTS, CATEGORIES, CATEGORY_FROM_LABEL } from "../lib/data";

const EMPTY: Filters = {
  material: "",
  origin: "",
  period: "",
  technique: "",
  category: "",
  sort: "new",
};

function unique(key: "material" | "origin" | "period"): string[] {
  return [...new Set(OBJECTS.map((o) => o[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "tr")
  );
}

export default function CollectionPage({ presetCategory = "" }: { presetCategory?: string }) {
  const [filters, setFilters] = useState<Filters>({ ...EMPTY, category: presetCategory });

  const onChange = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const materials = useMemo(() => unique("material"), []);
  const origins = useMemo(() => unique("origin"), []);
  const periods = useMemo(() => unique("period"), []);
  const categoryOptions = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        label: c.label,
        value: CATEGORY_FROM_LABEL[c.label] ?? c.label,
      })),
    []
  );

  const list = useMemo(() => {
    let result = OBJECTS.filter((o) => {
      if (filters.material && o.material !== filters.material) return false;
      if (filters.origin && o.origin !== filters.origin) return false;
      if (filters.period && o.period !== filters.period) return false;
      if (filters.category && o.category !== filters.category) return false;
      if (filters.technique) {
        const hay = (o.material + " " + o.shortDescription + " " + o.title).toLowerCase();
        if (!hay.includes(filters.technique.toLowerCase())) return false;
      }
      return true;
    });
    if (filters.sort === "az") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title, "tr"));
    }
    return result;
  }, [filters]);

  return (
    <div className="wrap">
      <div className="page-hero">
        <div>
          <h1>Koleksiyon Arşivi</h1>
          <p>
            Koleksiyon Arşivi, geçmişten bugüne uzanan kültürel belleği taşıyan oyma ahşap
            heykeller, dekoratif sanat nesneleri, resimler, çizimler, tekstiller ve koleksiyonluk
            parçaları bir araya getirir. Her nesne, ait olduğu dönemin izlerini ve insanın yaratıcı
            ifadesini yansıtır.
          </p>
          <div className="count">Arşivdeki Toplam Nesne: 247</div>
        </div>
        <div className="page-hero-art">
          <Placeholder category="Ahşap Oymacılık" />
        </div>
      </div>

      <FilterBar
        filters={filters}
        onChange={onChange}
        materials={materials}
        origins={origins}
        periods={periods}
        categories={categoryOptions}
      />

      <div className="result-note">{list.length} nesne gösteriliyor</div>

      {list.length ? (
        <ObjectGrid objects={list} cols5 compact />
      ) : (
        <p className="muted">Bu ölçütlere uygun nesne bulunamadı.</p>
      )}
    </div>
  );
}
