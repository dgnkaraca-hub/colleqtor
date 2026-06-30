import type { ArchiveObject } from "../types";

const BODHISATTVA = "ahs-bodhisattva-001";

export function buildMeta(obj: ArchiveObject): [string, string][] {
  if (obj.id === BODHISATTVA) {
    return [
      ["Koleksiyon", "Ahşap Oymacılık Koleksiyonu"],
      ["Malzeme", "Ahşap (muhtemelen şimşir veya sedir)"],
      ["Dönem", "19. yüzyıl"],
      ["Menşe", "Nepal / Himalaya Bölgesi"],
      ["Ölçüler", "Y 52 cm · G 32 cm · D 22 cm"],
      ["Durum", "İyi. Yüzeyde yaşa bağlı patina, çatlak yoktur."],
      ["Provenans", "Geleneksel manastır koleksiyonu, Nepal."],
    ];
  }
  return [
    ["Koleksiyon", obj.category + " Koleksiyonu"],
    ["Malzeme", obj.material],
    ["Dönem", obj.period],
    ["Menşe", obj.origin],
    ["Ölçüler", obj.dimensions ?? "Talep üzerine paylaşılır"],
    ["Durum", obj.condition ?? "İyi. Yüzeyde yaşa bağlı doğal kullanım izleri mevcuttur."],
    ["Provenans", obj.provenance ?? "Özel koleksiyon."],
  ];
}

export function buildDescription(obj: ArchiveObject): string[] {
  if (obj.id === BODHISATTVA) {
    return [
      "Bu zarif Bodhisattva figürü, Himalaya sanatının ruhani derinliğini ve usta zanaatkârların yüksek oyma becerisini yansıtır. Çok kollu formu, merhamet ve bilgeliğin niteliklerini sembolize ederken, elindeki lotus tomurcukları aydınlanma yoluna işaret eder. Taç, kolye ve giysi kıvrımlarındaki ince oyma detaylar, dönemin estetik zevkini ve ritüel hassasiyetini bütün gücüyle ortaya koyar.",
      "Doğal ahşabın sıcak tonları ve zamanla oluşmuş patinası, figüre hem vakar hem de yaşanmışlık kazandırır. Bu eser yalnızca bir ibadet nesnesi değil; aynı zamanda Himalaya kültürel belleğinin, maneviyatla günlük yaşamın kesiştiği bir dönemin sessiz tanığıdır.",
    ];
  }
  return [
    obj.shortDescription,
    "Malzemenin dokusu, işçiliğin ritmi ve zamanla oluşan patina, nesneyi ait olduğu dönemin sessiz bir tanığına dönüştürür. Her ayrıntı, ona dokunan ellerin ve geçen zamanın kaydını taşır.",
  ];
}

export function buildNote(obj: ArchiveObject): string {
  if (obj.id === BODHISATTVA) {
    return "Bodhisattva ikonografisinde çok kollu betimlemeler, tüm varlıklara uzanan şefkatin ve sonsuz yardım etme arzusunun sembolüdür. Bu tür figürler, tapınak sunaklarında veya özel meditasyon alanlarında yer alır.";
  }
  return "Bu nesne, gündelik kullanım ile zanaat hafızasının kesiştiği noktada durur; biçimi ve yüzeyi, ait olduğu kültürün maddi belleğine dair sessiz bir ipucu sunar.";
}
