import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import type { Filters } from "../components/FilterBar";
import ObjectGrid from "../components/ObjectGrid";
import Placeholder from "../components/Placeholder";
import LogoSymbol from "../components/LogoSymbol";
import { SearchIcon } from "../components/Icons";
import { OBJECTS, CATEGORIES, CATEGORY_FROM_LABEL } from "../lib/data";
import { useReveal } from "../lib/useReveal";
import { useDocumentMeta } from "../lib/seo";

const EMPTY: Filters = {
  q: "",
  material: "",
  origin: "",
  period: "",
  technique: "",
  category: "",
  status: "",
  sort: "new",
};

function unique(key: "material" | "origin" | "period"): string[] {
  return [...new Set(OBJECTS.map((o) => o[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "tr")
  );
}

const lc = (s: string) => s.toLocaleLowerCase("tr");

export default function CollectionPage({ presetCategory = "" }: { presetCategory?: string }) {
  const [params] = useSearchParams();
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<Filters>({
    ...EMPTY,
    category: presetCategory,
    q: params.get("q") ?? "",
  });

  const onChange = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));

  // Focus the search field when arriving from the header search icon.
  useEffect(() => {
    if ((location.state as { focusSearch?: boolean } | null)?.focusSearch) {
      searchRef.current?.focus();
    }
  }, [location.state]);

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
    const q = lc(filters.q.trim());
    let result = OBJECTS.filter((o) => {
      if (filters.material && o.material !== filters.material) return false;
      if (filters.origin && o.origin !== filters.origin) return false;
      if (filters.period && o.period !== filters.period) return false;
      if (filters.category && o.category !== filters.category) return false;
      if (filters.status && o.statusLabel !== filters.status) return false;
      if (q) {
        const hay = lc(
          [
            o.title,
            o.category,
            o.origin,
            o.region ?? "",
            o.material,
            o.period,
            o.shortDescription,
            (o.tags ?? []).join(" "),
          ].join(" ")
        );
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (filters.sort === "az") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title, "tr"));
    }
    return result;
  }, [filters]);

  useReveal([list]);

  useDocumentMeta({
    title: presetCategory ? `${presetCategory} — Koleksiyon Arşivi` : "Koleksiyon Arşivi",
    description:
      "Oyma ahşap heykeller, dekoratif sanat nesneleri, resimler, çizimler ve tekstillerden oluşan koleksiyon arşivi — köken, dönem ve malzeme bilgileriyle.",
    path: presetCategory ? "/resim-cizim" : "/koleksiyon",
  });

  const activeCount = useMemo(
    () =>
      (["q", "material", "origin", "period", "category", "status"] as (keyof Filters)[]).filter(
        (k) => filters[k]
      ).length,
    [filters]
  );

  return (
    <div className="wrap">
      <div className="page-hero" data-reveal>
        <div>
          <h1>Koleksiyon Arşivi</h1>
          <p>
            Koleksiyon Arşivi, geçmişten bugüne uzanan kültürel belleği taşıyan oyma ahşap
            heykeller, dekoratif sanat nesneleri, resimler, çizimler, tekstiller ve koleksiyonluk
            parçaları bir araya getirir. Her nesne, ait olduğu dönemin izlerini ve insanın yaratıcı
            ifadesini yansıtır.
          </p>
          <div className="count">Arşivdeki Toplam Nesne: {OBJECTS.length}</div>
        </div>
        <div className="page-hero-art">
          <Placeholder category="Ahşap Oymacılık" />
        </div>
      </div>

      <div className="collection-search">
        <SearchIcon />
        <input
          ref={searchRef}
          type="search"
          value={filters.q}
          onChange={(e) => onChange("q", e.target.value)}
          placeholder="Arşivde ara — nesne, köken, malzeme, dönem ya da etiket…"
          aria-label="Arşivde ara"
        />
        {filters.q ? (
          <button type="button" className="clear-search" aria-label="Aramayı temizle" onClick={() => onChange("q", "")}>
            ×
          </button>
        ) : null}
      </div>

      <FilterBar
        filters={filters}
        onChange={onChange}
        materials={materials}
        origins={origins}
        periods={periods}
        categories={categoryOptions}
      />

      <div className="result-bar">
        <span className="result-note">{list.length} nesne gösteriliyor</span>
        {activeCount > 0 ? (
          <button
            type="button"
            className="clear-filters"
            onClick={() => setFilters({ ...EMPTY })}
          >
            Filtreleri temizle ({activeCount})
          </button>
        ) : null}
      </div>

      {list.length ? (
        <ObjectGrid objects={list} cols5 compact />
      ) : (
        <div className="empty-state">
          <LogoSymbol />
          <div className="empty-title">Bu ölçütlere uygun bir kayıt yok.</div>
          <p>
            Arama ya da filtreleri sadeleştirerek arşivin tamamına yeniden bakabilirsiniz.
          </p>
          {activeCount > 0 ? (
            <button type="button" className="clear-filters" onClick={() => setFilters({ ...EMPTY })}>
              Filtreleri temizle
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
