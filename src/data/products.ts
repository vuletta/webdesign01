import type { Brew, Category, Product } from "../types";

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/bee0ef2c-5118-445d-bf70-d1ad50191934/_result.png";

export const PRODUCTS: Product[] = [
  {
    id: "lovchen-blend",
    name: "Lovćen Blend",
    subtitle: "Espresso mješavina · srednje tamno",
    origin: "Etiopija & Brazil",
    process: "Washed / Natural",
    altitude: "1.600–1.900 m",
    category: "espresso",
    roast: 4,
    notes: ["Čokolada", "Lješnik", "Kora pomorandže"],
    price250: 9.5,
    price1kg: 32.0,
    image:
      "https://image.qwenlm.ai/generated-images/4ce2ad46-5ddf-497f-9d03-d279a632b9fd/_result.png",
    badge: "Najprodavanije",
    accent: "#e8a33d",
    description:
      "Naša kućna mješavina — zrela, slatka i postojana. Tamnija strana prženja vuče na čokoladu i lješnik, dok etiopska komponenta daje suptilnu citrusnu svježinu. Kafa koju Podgorica pije godinama.",
    brew: ["espresso", "moka"],
  },
  {
    id: "skadar-zora",
    name: "Skadar Zora",
    subtitle: "Filter · svijetlo prženje",
    origin: "Etiopija · Yirgacheffe",
    process: "Washed",
    altitude: "1.900–2.100 m",
    category: "filter",
    roast: 2,
    notes: ["Bergamot", "Jasmin", "Bijela breskva"],
    price250: 11.0,
    price1kg: 38.5,
    image:
      "https://image.qwenlm.ai/generated-images/df4666c0-3582-4c94-9328-a8704d6e2d49/_result.png",
    badge: "Novo",
    accent: "#7dbfab",
    description:
      "Svijetla i prozračna kao jutro nad Skadarskim jezerom. Cvjetne note jasmina i bergamota, voćna kiselost i dugačak sladak finiš. Za one koji kafu piju polako, gledajući u vodu.",
    brew: ["v60", "french"],
  },
  {
    id: "boka-nocna",
    name: "Boka Noćna",
    subtitle: "Espresso · tamno prženje",
    origin: "Brazil · Cerrado",
    process: "Natural",
    altitude: "1.100–1.300 m",
    category: "espresso",
    roast: 5,
    notes: ["Kakao", "Pečeni orah", "Karamela"],
    price250: 9.9,
    price1kg: 33.5,
    image:
      "https://image.qwenlm.ai/generated-images/86cf240a-8108-4fa9-a0b4-91d4c3049f57/_result.png",
    accent: "#d8b25a",
    description:
      "Gusta, tamna i ozbiljna — kao noć nad Bokom. Puna tijela, niske kiselosti, sa izraženim notama kakaa i karamele. Savršena za mlijeko i duge razgovore na rivi.",
    brew: ["espresso", "moka"],
  },
  {
    id: "tara-cold-brew",
    name: "Tara Cold Brew",
    subtitle: "Filter · srednje prženje",
    origin: "Kolumbija · Huila",
    process: "Washed",
    altitude: "1.500–1.800 m",
    category: "filter",
    roast: 3,
    notes: ["Crvena jabuka", "Panela", "Crni čaj"],
    price250: 10.8,
    price1kg: 36.5,
    image:
      "https://image.qwenlm.ai/generated-images/56c295f0-a807-48c3-bc28-39aa65b07b13/_result.png",
    badge: "Za ljeto",
    accent: "#97a06b",
    description:
      "Selektovana za hladnu ekstrakciju — bistra i osvježavajuća kao voda Tare. Sladost panela jabuke i čist finiš crnog čaja. Preporučujemo 16 sati strpljive hladne ekstrakcije.",
    brew: ["cold", "french"],
  },
  {
    id: "duklja-decaf",
    name: "Duklja Decaf",
    subtitle: "Bez kofeina · srednje prženje",
    origin: "Kolumbija · Cauca",
    process: "Sugarcane decaf",
    altitude: "1.700–2.000 m",
    category: "decaf",
    roast: 3,
    notes: ["Mliječna čokolada", "Badem", "Suvo grožđe"],
    price250: 10.2,
    price1kg: 34.5,
    image:
      "https://image.qwenlm.ai/generated-images/676f3c8b-ecbd-443c-9562-1ffaf177c973/_result.png",
    accent: "#c98f63",
    description:
      "Sav ukus, bez neprospavanih noći. Dekofeinizacija šećernom trskom čuva slatkoću i punoću — mliječna čokolada i badem u svakoj šolji. Za poslednju kafu u danu, onu najslađu.",
    brew: ["espresso", "v60", "moka"],
  },
  {
    id: "adriatic-honey",
    name: "Adriatic Honey",
    subtitle: "Filter · honey proces",
    origin: "Honduras · Marcala",
    process: "Honey",
    altitude: "1.500–1.700 m",
    category: "filter",
    roast: 3,
    notes: ["Med", "Kajsija", "Smeđi šećer"],
    price250: 12.5,
    price1kg: 42.0,
    image:
      "https://image.qwenlm.ai/generated-images/11f84b34-2c52-4baa-8790-019c755d1d23/_result.png",
    badge: "Limitirano",
    accent: "#d98e32",
    description:
      "Honey procesirana, limitirana serija — samo 40 džakova stiglo je u pržionicu. Sirupasto tijelo, medna sladost i kajsija koja podsjeća na primorsko ljeto. Nestaje brzo.",
    brew: ["v60", "cold"],
  },
];

export const CATEGORIES: { id: "sve" | Category; label: string }[] = [
  { id: "sve", label: "Sve kafe" },
  { id: "espresso", label: "Espresso" },
  { id: "filter", label: "Filter" },
  { id: "decaf", label: "Bez kofeina" },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  espresso: "Espresso",
  filter: "Filter",
  decaf: "Bez kofeina",
};

export const ROAST_LABELS = [
  "Veoma svijetlo",
  "Svijetlo",
  "Srednje",
  "Srednje tamno",
  "Tamno",
];

export const BREW_LABELS: Record<Brew, string> = {
  espresso: "Espresso",
  v60: "V60 / filter",
  french: "French press",
  cold: "Cold brew",
  moka: "Moka",
};

export const CITIES = [
  "Podgorica",
  "Nikšić",
  "Budva",
  "Kotor",
  "Tivat",
  "Herceg Novi",
  "Bar",
  "Ulcinj",
  "Cetinje",
  "Danilovgrad",
  "Bijelo Polje",
  "Berane",
];
