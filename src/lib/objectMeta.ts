import type { ArchiveObject } from "../types";

const DESC_FALLBACK =
  "Malzemenin dokusu, işçiliğin ritmi ve zamanla oluşan patina, nesneyi ait olduğu dönemin sessiz bir tanığına dönüştürür. Her ayrıntı, ona dokunan ellerin ve geçen zamanın kaydını taşır.";

const NOTE_FALLBACK =
  "Bu nesne, gündelik kullanım ile zanaat hafızasının kesiştiği noktada durur; biçimi ve yüzeyi, ait olduğu kültürün maddi belleğine dair sessiz bir ipucu sunar.";

/** Build the künye (metadata) rows for the detail table, straight from the record. */
export function buildMeta(obj: ArchiveObject): [string, string][] {
  const rows: [string, string][] = [
    ["Koleksiyon", `${obj.category} Koleksiyonu`],
    ["Malzeme", obj.material],
    ["Dönem", obj.period],
  ];
  if (obj.estimatedYear) rows.push(["Tahmini Tarih", obj.estimatedYear]);
  rows.push(["Menşe", obj.origin]);
  if (obj.region) rows.push(["Bölge", obj.region]);
  rows.push(["Ölçüler", obj.dimensions ?? "Talep üzerine paylaşılır"]);
  rows.push([
    "Durum",
    obj.condition ?? "İyi. Yüzeyde yaşa bağlı doğal kullanım izleri mevcuttur.",
  ]);
  rows.push(["Provenans", obj.provenance ?? "Özel koleksiyon."]);
  return rows;
}

/** Description paragraphs — prefer the authored longDescription, else fall back. */
export function buildDescription(obj: ArchiveObject): string[] {
  if (obj.longDescription?.length) return obj.longDescription;
  return [obj.shortDescription, DESC_FALLBACK];
}

/** Collector note — prefer the authored note, else a graceful fallback. */
export function buildNote(obj: ArchiveObject): string {
  return obj.collectorNote ?? NOTE_FALLBACK;
}
