export type Category = "ficcion" | "terror" | "scifi" | "ensayo";
export type ScoreTone = "hot" | "warm" | "cool";

export interface Book {
  slug: string;
  title: string;
  author: string;
  score: number;
  /** null means the book only appears under Todos. */
  category: Category | null;
  pages: number;
  chip: string;
  chipTone: "lilac" | "gold";
  line: string;
  quote: string;
  tag: string;
  facts: string[];
  verdict: string;
  verdictTone: "paper" | "muted" | "blush";
  recentRank: number;
  featured: boolean;
  homeBlurb?: string;
  homeOrder?: number;
  cover: string;
}

export const edition = {
  number: 48,
  featuredDate: "Jueves, 24 de Octubre",
  archiveLabel: "142 obras desglosadas",
};

export const books: Book[] = [
  {
    slug: "ciudad",
    title: "La ciudad sumergida",
    author: "Mariana Enríquez",
    score: 9.4,
    category: "terror",
    pages: 340,
    chip: "Terror psicológico",
    chipTone: "lilac",
    line: "“La memoria fluvial convertida en pesadilla.”",
    quote:
      "“Una disección asfixiante de la memoria y la decadencia urbana. Enríquez convierte el río en un monstruo de dientes afilados que devora secretos de familia con una prosa que no concede ni una pizca de piedad.”",
    tag: "TERROR LITERARIO · FICCIÓN",
    facts: ["Lectura de 3h 40min", "Tensión psicológica alta", "340 págs"],
    verdict: "Lectura imprescindible",
    verdictTone: "paper",
    recentRank: 1,
    featured: true,
    cover: "/covers/ciudad.jpg",
  },
  {
    slug: "yellowface",
    title: "Yellowface",
    author: "R.F. Kuang",
    score: 9.4,
    category: "ficcion",
    pages: 320,
    chip: "Sátira literaria",
    chipTone: "gold",
    line: "“Plagio e histeria digital en el Nueva York editorial.”",
    quote: "“Plagio e histeria digital en el Nueva York editorial.”",
    tag: "Sátira literaria",
    facts: ["320 págs", "Tastemaker Choice"],
    verdict: "Tastemaker Choice",
    verdictTone: "paper",
    recentRank: 2,
    featured: false,
    homeOrder: 1,
    homeBlurb:
      "Una sátira feroz sobre la envidia editorial, el blanqueamiento cultural y la impostura en las redes sociales contemporáneas. Imposible soltarlo.",
    cover: "/covers/yellowface.jpg",
  },
  {
    slug: "ceniza",
    title: "Ceniza en las Manos",
    author: "David S. Rivas",
    score: 9.1,
    category: "terror",
    pages: 410,
    chip: "Noir nórdico",
    chipTone: "lilac",
    line: "“Seco, cortante y con diálogos que queman.”",
    quote: "“Seco, cortante y con diálogos que queman.”",
    tag: "Noir nórdico",
    facts: ["410 págs", "Lectura rápida nocturna"],
    verdict: "Lectura rápida nocturna",
    verdictTone: "muted",
    recentRank: 5,
    featured: false,
    cover: "/covers/ceniza.jpg",
  },
  {
    slug: "protocolo",
    title: "Protocolo Silicio",
    author: "Kenji Takahashi",
    score: 8.7,
    category: "scifi",
    pages: 290,
    chip: "Sci-Fi dura",
    chipTone: "lilac",
    line: "“Precisión técnica y claustrofobia espacial.”",
    quote: "“Precisión técnica y claustrofobia espacial.”",
    tag: "Sci-Fi dura",
    facts: ["290 págs", "Alta densidad analítica"],
    verdict: "Alta densidad analítica",
    verdictTone: "muted",
    recentRank: 3,
    featured: false,
    homeOrder: 2,
    homeBlurb:
      "Sci-fi hiperrealista sobre minería orbital y soledad corporativa en gravedad cero. Austero, técnico y extrañamente poético.",
    cover: "/covers/protocolo.jpg",
  },
  {
    slug: "piranesi",
    title: "Piranesi",
    author: "Susanna Clarke",
    score: 8.2,
    category: null,
    pages: 256,
    chip: "Fantasía insólita",
    chipTone: "gold",
    line: "“Pureza poética en un palacio sumergido.”",
    quote: "“Pureza poética en un palacio sumergido.”",
    tag: "Fantasía insólita",
    facts: ["256 págs", "Sensibilidad lírica"],
    verdict: "Sensibilidad lírica",
    verdictTone: "muted",
    recentRank: 4,
    featured: false,
    homeOrder: 3,
    homeBlurb:
      "Un laberinto onírico de mareas y templos infinitos; una fábula deslumbrante sobre la inocencia y el aislamiento contemplativo.",
    cover: "/covers/piranesi.jpg",
  },
  {
    slug: "algoritmo",
    title: "Ciudad Algoritmo",
    author: "Carla E. Bermejo",
    score: 7.8,
    category: "scifi",
    pages: 368,
    chip: "Distopía",
    chipTone: "lilac",
    line: "“Premisa fascinante que pierde fuelle al final.”",
    quote: "“Premisa fascinante que pierde fuelle al final.”",
    tag: "Distopía",
    facts: ["368 págs", "Veredicto agridulce"],
    verdict: "Veredicto agridulce",
    verdictTone: "blush",
    recentRank: 6,
    featured: false,
    cover: "/covers/algoritmo.jpg",
  },
];

export function getBook(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function scoreTone(score: number): ScoreTone {
  if (score >= 9) return "hot";
  if (score >= 8.5) return "warm";
  return "cool";
}

export function formatScore(score: number) {
  return score.toFixed(1);
}
