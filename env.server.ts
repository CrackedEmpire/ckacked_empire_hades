import { z } from "zod";

export type Lang = "en" | "ru";
export type SubjectId = "furry" | "human" | "other";
export type ScopeId = "bust" | "half" | "full";
export type PayId = "boosty" | "bybit";

export const LANG_KEY = "cracked-empire-lang";

export type Copy = {
  skip: string;
  navWork: string;
  navCommission: string;
  navPay: string;
  navComic: string;
  menuOpen: string;
  menuClose: string;
  langLabel: string;
  kicker: string;
  alias: string;
  lede: string;
  ctaCover: string;
  ctaCommission: string;
  coverKicker: string;
  coverTitle: string;
  coverAlt: string;
  worksKicker: string;
  worksTitle: string;
  comicKicker: string;
  comicTitle: string;
  comicFolder: string;
  quote: string;
  subjectsKicker: string;
  subjectsTitle: string;
  subjects: { title: string; text: string }[];
  processTitle: string;
  steps: { no: string; title: string; text: string }[];
  orderKicker: string;
  orderTitle: string;
  orderLede: string;
  scopeLegend: string;
  scopes: { id: ScopeId; label: string; note: string }[];
  subjectLegend: string;
  subjectsChoice: { id: SubjectId; label: string }[];
  mechanical: string;
  mechanicalOn: string;
  mechanicalOff: string;
  mechanicalNote: string;
  background: string;
  backgroundOn: string;
  backgroundOff: string;
  characters: string;
  charactersOn: string;
  charactersOff: string;
  priceLabel: string;
  priceAside: string;
  payLegend: string;
  payBoosty: string;
  payBoostyNote: string;
  payBybit: string;
  payBybitNote: string;
  payExplainTitle: string;
  payExplain: string;
  formTitle: string;
  formHint: string;
  nameLabel: string;
  contactLabel: string;
  aboutLabel: string;
  nameError: string;
  contactError: string;
  submit: string;
  inboxTitle: string;
  inboxEmpty: string;
  copyBtn: string;
  removeBtn: string;
  noticeSaved: string;
  noticeCopied: string;
  noticeCopyFail: string;
  summaryMechanical: string;
  footerLine: string;
  footerMeta: string;
  close: string;
};

export const copy: Record<Lang, Copy> = {
  en: {
    skip: "Skip to content",
    navWork: "Work",
    navCommission: "Commissions",
    navPay: "Pay",
    navComic: "Almost Humans",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langLabel: "Language",
    kicker: "Character artist",
    alias: "also Hades",
    lede: "Any living being. People, furries, animals. Mechanical parts cost more — plating, gears, wiring, the fiddly stuff.",
    ctaCover: "The cover",
    ctaCommission: "Commission",
    coverKicker: "Cover",
    coverTitle: "A new start",
    coverAlt:
      "Dark anthropomorphic wolf in a red robe and a thorn crown, blood on the muzzle, hands raised, crimson backlight",
    worksKicker: "Work",
    worksTitle: "Recent pieces",
    comicKicker: "Comic",
    comicTitle: "Almost Humans",
    comicFolder: "Extra material",
    quote: "…maybe a new start isn’t the worst idea",
    subjectsKicker: "What I draw",
    subjectsTitle: "Any living being",
    subjects: [
      {
        title: "Anything alive",
        text: "People, furries, animals. If it lives, I’ll draw it.",
      },
      {
        title: "Your version",
        text: "Markings, build, the details you care about. A photo or a sketch is enough to start.",
      },
      {
        title: "Mechanical",
        text: "Armor, prosthetics, machines. Priced higher than a plain body.",
      },
    ],
    processTitle: "How a piece goes",
    steps: [
      {
        no: "01",
        title: "Brief",
        text: "Who they are, and a few references. The rate is on this page. Mechanical parts are extra.",
      },
      {
        no: "02",
        title: "Sketch",
        text: "One direction you can still turn. We lock the pose before I render.",
      },
      {
        no: "03",
        title: "Finish",
        text: "Color and the final file. Pay on Boosty, or ByBit if that’s easier for you.",
      },
    ],
    orderKicker: "Commission",
    orderTitle: "Tell me who to draw",
    orderLede:
      "Head $7, half body $10, full body $15. A detailed background adds 30%. Two or more characters add 50%.",
    scopeLegend: "How much of them",
    scopes: [
      { id: "bust", label: "Head", note: "$7" },
      { id: "half", label: "Half body", note: "$10" },
      { id: "full", label: "Full body", note: "$15" },
    ],
    subjectLegend: "Who",
    subjectsChoice: [
      { id: "furry", label: "Furry" },
      { id: "human", label: "Human" },
      { id: "other", label: "Other living being" },
    ],
    mechanical: "Mechanical parts",
    mechanicalOn: "yes · higher rate",
    mechanicalOff: "no",
    mechanicalNote: "Mechanical parts are extra. I confirm that before I start — it is not in the number below.",
    background: "Detailed background",
    backgroundOn: "+30%",
    backgroundOff: "no",
    characters: "Two or more characters",
    charactersOn: "+50%",
    charactersOff: "no",
    priceLabel: "Total",
    priceAside: "One character, plain background. Extras are already in the number.",
    payLegend: "How you’ll pay",
    payBoosty: "Boosty",
    payBoostyNote: "usual way",
    payBybit: "ByBit",
    payBybitNote: "crypto, if you prefer",
    payExplainTitle: "Payment",
    payExplain:
      "I take payment on Boosty. ByBit works too — say so in the brief and I’ll send the details with the quote. I don’t post a wallet here.",
    formTitle: "Leave a brief",
    formHint: "Stays in this browser until I have a mailbox wired up. I’ll answer with a Boosty link or ByBit details.",
    nameLabel: "Name",
    contactLabel: "Email or Telegram",
    aboutLabel: "Who am I drawing",
    nameError: "What should I call you? At least two characters.",
    contactError: "Need an email or a Telegram handle.",
    submit: "Save the brief",
    inboxTitle: "Inbox",
    inboxEmpty: "Quiet for now. The first brief shows up here.",
    copyBtn: "Copy",
    removeBtn: "Remove",
    noticeSaved: "Saved in this browser. I’ll answer with payment details.",
    noticeCopied: "Brief copied.",
    noticeCopyFail: "Couldn’t copy — select the text yourself.",
    summaryMechanical: "mechanical",
    footerLine: "Any living being. Mechanical parts cost more.",
    footerMeta: "Pay on Boosty · ByBit on request",
    close: "Close",
  },
  ru: {
    skip: "К содержанию",
    navWork: "Работа",
    navCommission: "Заказ",
    navPay: "Оплата",
    navComic: "Almost Humans",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    langLabel: "Язык",
    kicker: "Художник персонажей",
    alias: "он же Hades",
    lede: "Любое живое существо: люди, фурри, звери. Механика дороже — броня, шестерни, проводка и прочая мелочь.",
    ctaCover: "Обложка",
    ctaCommission: "Заказать",
    coverKicker: "Обложка",
    coverTitle: "Новое начало",
    coverAlt:
      "Тёмный антропоморфный волк в красной рясе и терновом венце, кровь на морде, поднятые руки, багровый свет сзади",
    worksKicker: "Работы",
    worksTitle: "Последние работы",
    comicKicker: "Комикс",
    comicTitle: "Almost Humans",
    comicFolder: "Доп. материалы",
    quote: "…может, новое начало — не худшая идея",
    subjectsKicker: "Что рисую",
    subjectsTitle: "Любое живое существо",
    subjects: [
      {
        title: "Всё живое",
        text: "Люди, фурри, звери. Если это живое — нарисую.",
      },
      {
        title: "Как вы его видите",
        text: "Окрас, телосложение, детали, которые вам важны. Хватит фото или наброска.",
      },
      {
        title: "Механика",
        text: "Броня, протезы, машины. Это дороже обычного тела.",
      },
    ],
    processTitle: "Как проходит заказ",
    steps: [
      {
        no: "01",
        title: "Заявка",
        text: "Кто это и пара референсов. Цены на этой странице. Механика отдельно.",
      },
      {
        no: "02",
        title: "Эскиз",
        text: "Сначала набросок. Позу ещё можно поменять, потом уже не трогаю.",
      },
      {
        no: "03",
        title: "Готово",
        text: "Цвет и файл. Оплата на Boosty или через ByBit, если так удобнее.",
      },
    ],
    orderKicker: "Заказ",
    orderTitle: "Кого нарисовать",
    orderLede:
      "Голова $7, по пояс $10, в полный рост $15. Подробный фон +30%. Два персонажа и больше +50%.",
    scopeLegend: "Что в кадре",
    scopes: [
      { id: "bust", label: "Голова", note: "$7" },
      { id: "half", label: "По пояс", note: "$10" },
      { id: "full", label: "В полный рост", note: "$15" },
    ],
    subjectLegend: "Кто",
    subjectsChoice: [
      { id: "furry", label: "Фурри" },
      { id: "human", label: "Человек" },
      { id: "other", label: "Другое живое" },
    ],
    mechanical: "Механические детали",
    mechanicalOn: "да, дороже",
    mechanicalOff: "нет",
    mechanicalNote: "Механику считаю отдельно и называю цену до начала. В сумму выше она не входит.",
    background: "Подробный фон",
    backgroundOn: "+30%",
    backgroundOff: "нет",
    characters: "Два персонажа и больше",
    charactersOn: "+50%",
    charactersOff: "нет",
    priceLabel: "Сумма",
    priceAside: "Один персонаж и простой фон. Надбавки уже учтены.",
    payLegend: "Как платите",
    payBoosty: "Boosty",
    payBoostyNote: "как обычно",
    payBybit: "ByBit",
    payBybitNote: "криптой, если удобнее",
    payExplainTitle: "Оплата",
    payExplain:
      "Оплата на Boosty. ByBit тоже подойдёт — напишите в заявке, и я пришлю реквизиты вместе с ценой. Кошелёк здесь не публикую.",
    formTitle: "Заявка",
    formHint: "Пока сохранится только в этом браузере. Отвечу ссылкой на Boosty или реквизитами ByBit.",
    nameLabel: "Имя",
    contactLabel: "Почта или Telegram",
    aboutLabel: "Кого нарисовать",
    nameError: "Напишите, как к вам обращаться. Хотя бы два символа.",
    contactError: "Нужна почта или ник в Telegram.",
    submit: "Сохранить заявку",
    inboxTitle: "Заявки",
    inboxEmpty: "Пока пусто. Первая заявка появится здесь.",
    copyBtn: "Копировать",
    removeBtn: "Убрать",
    noticeSaved: "Сохранено в этом браузере. Напишу, как оплатить.",
    noticeCopied: "Заявка скопирована.",
    noticeCopyFail: "Не скопировалось. Выделите текст сами.",
    summaryMechanical: "механика",
    footerLine: "Любое живое существо. Механика дороже.",
    footerMeta: "Оплата на Boosty · ByBit по запросу",
    close: "Закрыть",
  },
};

export const inquirySchema = z.object({
  id: z.string(),
  name: z.string(),
  contact: z.string(),
  message: z.string(),
  subject: z.enum(["furry", "human", "other"]),
  scope: z.enum(["bust", "half", "full"]),
  mechanical: z.boolean(),
  background: z.boolean().default(false),
  characters: z.boolean().default(false),
  price: z.number().optional(),
  pay: z.enum(["boosty", "bybit"]),
  at: z.string(),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export const INBOX_KEY = "cracked-empire-inbox";

export function readInbox(): Inquiry[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(INBOX_KEY);
    if (!raw) return [];
    const parsed = z.array(inquirySchema).safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}

export function writeInbox(items: Inquiry[]) {
  localStorage.setItem(INBOX_KEY, JSON.stringify(items.slice(0, 24)));
}

export function readLang(): Lang {
  if (typeof localStorage === "undefined") return "en";
  return localStorage.getItem(LANG_KEY) === "ru" ? "ru" : "en";
}

const BASE_USD: Record<ScopeId, number> = { bust: 7, half: 10, full: 15 };

export function quoteUsd(scope: ScopeId, background: boolean, characters: boolean) {
  let price = BASE_USD[scope];
  if (background) price *= 1.3;
  if (characters) price *= 1.5;
  return Math.round(price * 100) / 100;
}

export function formatUsd(amount: number) {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

export const OWNER_EMAIL = "shternes2002@gmail.com";

const line = z.string().max(1200);

export const langOverrideSchema = z.object({
  lede: line.optional(),
  quote: line.optional(),
  coverTitle: line.optional(),
  subjectsTitle: line.optional(),
  subjects: z.array(z.object({ title: line, text: line })).max(4).optional(),
  steps: z.array(z.object({ title: line, text: line })).max(3).optional(),
  orderLede: line.optional(),
  payExplain: line.optional(),
  footerLine: line.optional(),
  footerMeta: line.optional(),
});

export const siteOverridesSchema = z.object({
  en: langOverrideSchema.optional(),
  ru: langOverrideSchema.optional(),
});

export type LangOverride = z.infer<typeof langOverrideSchema>;
export type SiteOverrides = z.infer<typeof siteOverridesSchema>;

function pick(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export function mergeCopy(base: Copy, extra: LangOverride | undefined): Copy {
  if (!extra) return base;
  return {
    ...base,
    lede: pick(extra.lede, base.lede),
    quote: pick(extra.quote, base.quote),
    coverTitle: pick(extra.coverTitle, base.coverTitle),
    subjectsTitle: pick(extra.subjectsTitle, base.subjectsTitle),
    orderLede: pick(extra.orderLede, base.orderLede),
    payExplain: pick(extra.payExplain, base.payExplain),
    footerLine: pick(extra.footerLine, base.footerLine),
    footerMeta: pick(extra.footerMeta, base.footerMeta),
    subjects: base.subjects.map((item, index) => ({
      title: pick(extra.subjects?.[index]?.title, item.title),
      text: pick(extra.subjects?.[index]?.text, item.text),
    })),
    steps: base.steps.map((item, index) => ({
      ...item,
      title: pick(extra.steps?.[index]?.title, item.title),
      text: pick(extra.steps?.[index]?.text, item.text),
    })),
  };
}

export function draftFromCopy(base: Copy): LangOverride {
  return {
    lede: base.lede,
    quote: base.quote,
    coverTitle: base.coverTitle,
    subjectsTitle: base.subjectsTitle,
    orderLede: base.orderLede,
    payExplain: base.payExplain,
    footerLine: base.footerLine,
    footerMeta: base.footerMeta,
    subjects: base.subjects.map((item) => ({ title: item.title, text: item.text })),
    steps: base.steps.map((item) => ({ title: item.title, text: item.text })),
  };
}

