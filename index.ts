import type { Lang } from "@/data/studio";

export type Work = {
  id: string;
  src: string;
  w: number;
  h: number;
  title: Record<Lang, string>;
  alt: Record<Lang, string>;
};

export const works: Work[] = [
  {
    id: "nowhere",
    src: "/works/nowhere.jpg",
    w: 1185,
    h: 1800,
    title: { en: "God Is Nowhere", ru: "God Is Nowhere" },
    alt: {
      en: "Pale figure in a high-collar violet robe, glowing white eyes, one hand raised, handwritten text God Is Nowhere",
      ru: "Бледная фигура в фиолетовой рясе с высоким воротом, светящиеся глаза, поднятая рука, надпись God Is Nowhere",
    },
  },
  {
    id: "memorial",
    src: "/works/memorial.jpg",
    w: 1421,
    h: 1800,
    title: { en: "Memorial Corp.", ru: "Memorial Corp." },
    alt: {
      en: "Blond man in a gray high-collar uniform holding sunglasses, city behind him, the words Memorial Corp.",
      ru: "Светловолосый человек в серой форме с высоким воротом, в руке очки, за спиной город и надпись Memorial Corp.",
    },
  },
  {
    id: "boys",
    src: "/works/boys.jpg",
    w: 1695,
    h: 1800,
    title: { en: "The Boys", ru: "The Boys" },
    alt: {
      en: "Blond man in a blue and red suit, a red beam from one eye, torn flag behind him",
      ru: "Светловолосый человек в сине-красном костюме, красный луч из глаза, рваный флаг на фоне",
    },
  },
  {
    id: "bang",
    src: "/works/bang.jpg",
    w: 1469,
    h: 1800,
    title: { en: "Bang Bang", ru: "Bang Bang" },
    alt: {
      en: "Black cat sitting in profile with a torn ear and yellow eye, red splatter and the words Bang Bang",
      ru: "Чёрный кот в профиль, рваное ухо и жёлтый глаз, красные брызги и надпись Bang Bang",
    },
  },
  {
    id: "reference",
    src: "/works/reference.jpg",
    w: 1399,
    h: 1800,
    title: { en: "From a reference", ru: "С референса" },
    alt: {
      en: "Dark long-haired cat character in a purple top, drawn beside a photo of the real cat",
      ru: "Тёмный длинношёрстный кошачий персонаж в фиолетовом топе, рядом фото живого кота",
    },
  },
  {
    id: "sea",
    src: "/works/sea.jpg",
    w: 1000,
    h: 1000,
    title: { en: "Open water", ru: "Открытая вода" },
    alt: {
      en: "Storm sea, white foam and gray-green waves under a bright break in the clouds",
      ru: "Штормовое море, белая пена и серо-зелёные волны под просветом в тучах",
    },
  },
];
