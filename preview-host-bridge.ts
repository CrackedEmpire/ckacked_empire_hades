import type { Lang } from "@/data/studio";

export type ComicSheet = {
  id: string;
  src: string;
  w: number;
  h: number;
  title: Record<Lang, string>;
  alt: Record<Lang, string>;
};

export const almostCovers: ComicSheet = {
  id: "almost-covers",
  src: "/works/almost-covers.jpg",
  w: 1273,
  h: 1800,
  title: { en: "Cover prototypes", ru: "Прототипы обложек" },
  alt: {
    en: "Three Almost Humans cover sketches: a woman with a triangle mark, tentacles, and purple light",
    ru: "Три эскиза обложки Almost Humans: женщина со знаком треугольника, щупальца и фиолетовый свет",
  },
};
