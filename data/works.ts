export interface Artwork {
  id: string;
  src: string;
  title?: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  dimensionsCm?: string;
  description?: string;
}

/** Find an artwork by ID across all series, returning both the work and its parent series */
export function findArtwork(id: string): { work: Artwork; series: Series } | null {
  for (const s of series) {
    const work = s.works.find((w) => w.id === id);
    if (work) return { work, series: s };
  }
  return null;
}

/** Get all artwork IDs for static generation */
export function getAllArtworkIds(): string[] {
  return series.flatMap((s) => s.works.map((w) => w.id));
}

export interface Series {
  id: string;
  title: string;
  year: string;
  description?: string;
  works: Artwork[];
}

// ──────────────────────────────────────────────
// Reemplazar las rutas placeholder con imágenes reales en /public/works/
// Convención de nombres: /works/{serie-id}/{01,02,03...}.jpg
// ──────────────────────────────────────────────

export const series: Series[] = [
  {
    id: "serie-1",
    title: "SERIE I",
    year: "2024 – 2025",
    description: "Exploración de la tensión entre lo orgánico y lo geométrico. Capas superpuestas de color construyen atmósferas que oscilan entre la calma y la inquietud, buscando ese punto donde la materia deja de ser superficie y empieza a ser presencia.",
    works: [
      { id: "s1-01", src: "/works/serie-1/01.jpg", title: "Obra I", year: "2025", medium: "Óleo sobre tela", dimensions: "100 x 80 cm", description: "Exploración de la tensión entre lo orgánico y lo geométrico. Capas superpuestas de color construyen una atmósfera que oscila entre la calma y la inquietud." },
      { id: "s1-02", src: "/works/serie-1/02.jpg", title: "Obra II", year: "2024", medium: "Óleo sobre tela", dimensions: "120 x 90 cm", description: "La luz como protagonista. Un estudio sobre cómo la luminosidad transforma la percepción del espacio y la materia." },
      { id: "s1-03", src: "/works/serie-1/03.jpg", title: "Obra III", year: "2024", medium: "Óleo sobre tela", dimensions: "80 x 60 cm" },
      { id: "s1-04", src: "/works/serie-1/04.jpg", title: "Obra IV", year: "2024", medium: "Técnica mixta", dimensions: "100 x 100 cm", description: "Fragmentos de memoria reconstruidos a través de la materia. La superficie guarda el registro del gesto y el tiempo." },
      { id: "s1-05", src: "/works/serie-1/05.jpg", title: "Obra V", year: "2024", medium: "Óleo sobre tela", dimensions: "90 x 70 cm" },
    ],
  },
  {
    id: "serie-2",
    title: "SERIE II",
    year: "2023 – 2024",
    description: "La luz como protagonista. Un estudio sostenido sobre cómo la luminosidad transforma la percepción del espacio, el volumen y la materia. Cada pieza propone un diálogo entre lo visible y lo que se intuye.",
    works: [
      { id: "s2-01", src: "/works/serie-2/01.jpg", title: "Obra I", medium: "Acrílico sobre tela", dimensions: "110 x 85 cm" },
      { id: "s2-02", src: "/works/serie-2/02.jpg", title: "Obra II", medium: "Acrílico sobre tela", dimensions: "95 x 75 cm" },
      { id: "s2-03", src: "/works/serie-2/03.jpg", title: "Obra III", medium: "Técnica mixta", dimensions: "100 x 80 cm" },
      { id: "s2-04", src: "/works/serie-2/04.jpg", title: "Obra IV", medium: "Acrílico sobre tela", dimensions: "120 x 100 cm" },
      { id: "s2-05", src: "/works/serie-2/05.jpg", title: "Obra V", medium: "Técnica mixta", dimensions: "80 x 60 cm" },
    ],
  },
  {
    id: "serie-3",
    title: "SERIE III",
    year: "2022 – 2023",
    description: "Fragmentos de memoria reconstruidos a través de la materia. La superficie guarda el registro del gesto y del tiempo; cada obra es un intento de atrapar lo que se escapa entre lo vivido y lo imaginado.",
    works: [
      { id: "s3-01", src: "/works/serie-3/01.jpg", title: "Obra I", medium: "Óleo sobre tela", dimensions: "90 x 70 cm" },
      { id: "s3-02", src: "/works/serie-3/02.jpg", title: "Obra II", medium: "Óleo sobre tela", dimensions: "100 x 80 cm" },
      { id: "s3-03", src: "/works/serie-3/03.jpg", title: "Obra III", medium: "Óleo sobre tela", dimensions: "85 x 65 cm" },
      { id: "s3-04", src: "/works/serie-3/04.jpg", title: "Obra IV", medium: "Técnica mixta", dimensions: "110 x 90 cm" },
    ],
  },
];
