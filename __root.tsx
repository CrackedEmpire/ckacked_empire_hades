import { useEffect, useId, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  copy,
  formatUsd,
  mergeCopy,
  quoteUsd,
  readInbox,
  readLang,
  writeInbox,
  LANG_KEY,
  type Inquiry,
  type Lang,
  type PayId,
  type ScopeId,
  type SiteOverrides,
  type SubjectId,
} from "@/data/studio";
import { loadSiteCopy } from "@/lib/site-copy";
import { works } from "@/data/works";
import { almostCovers } from "@/data/comic";

export function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const [openId, setOpenId] = useState<string | null>(null);
  const [subject, setSubject] = useState<SubjectId>("furry");
  const [scope, setScope] = useState<ScopeId>("half");
  const [mechanical, setMechanical] = useState(false);
  const [background, setBackground] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [pay, setPay] = useState<PayId>("boosty");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [inbox, setInbox] = useState<Inquiry[]>([]);
  const [ready, setReady] = useState(false);
  const [overrides, setOverrides] = useState<SiteOverrides>({});
  const titleId = useId();
  const t = mergeCopy(copy[lang], overrides[lang]);

  useEffect(() => {
    const stored = readLang();
    setLang(stored);
    document.documentElement.lang = stored;
    setInbox(readInbox());
    setReady(true);
    loadSiteCopy()
      .then(setOverrides)
      .catch(() => setOverrides({}));
  }, []);

  useEffect(() => {
    if (!openId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
      if (openId === "cover") return;
      const index = works.findIndex((item) => item.id === openId);
      if (index < 0) return;
      if (event.key === "ArrowRight") setOpenId(works[(index + 1) % works.length].id);
      if (event.key === "ArrowLeft") setOpenId(works[(index - 1 + works.length) % works.length].id);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  function chooseLang(next: Lang) {
    setLang(next);
    document.documentElement.lang = next;
    localStorage.setItem(LANG_KEY, next);
    setNotice("");
    setFormError("");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    if (trimmedName.length < 2) {
      setFormError(t.nameError);
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const telegramOk = /^@?[a-zA-Z0-9_]{4,}$/.test(trimmedContact);
    if (!emailOk && !telegramOk) {
      setFormError(t.contactError);
      return;
    }
    const item: Inquiry = {
      id: crypto.randomUUID(),
      name: trimmedName,
      contact: trimmedContact,
      message: message.trim(),
      subject,
      scope,
      mechanical,
      background,
      characters,
      price: quoteUsd(scope, background, characters),
      pay,
      at: new Date().toISOString(),
    };
    const next = [item, ...readInbox()];
    writeInbox(next);
    setInbox(next);
    setName("");
    setContact("");
    setMessage("");
    setFormError("");
    setNotice(t.noticeSaved);
  }

  function removeInquiry(id: string) {
    const next = inbox.filter((item) => item.id !== id);
    writeInbox(next);
    setInbox(next);
  }

  async function copyBrief(item: Inquiry) {
    const text = [
      item.name,
      item.contact,
      `${labelSubject(item.subject)} · ${labelScope(item.scope)} · ${formatUsd(item.price ?? quoteUsd(item.scope, item.background, item.characters))}`,
      item.background ? t.background : "",
      item.characters ? t.characters : "",
      item.mechanical ? t.mechanicalNote : "",
      item.pay === "boosty" ? "Boosty" : "ByBit",
      item.message || "—",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setNotice(t.noticeCopied);
    } catch {
      setNotice(t.noticeCopyFail);
    }
  }

  function labelSubject(id: SubjectId) {
    return t.subjectsChoice.find((item) => item.id === id)?.label ?? id;
  }

  function labelScope(id: ScopeId) {
    return t.scopes.find((item) => item.id === id)?.label ?? id;
  }

  const piece = works.find((item) => item.id === openId) ?? (openId === almostCovers.id ? almostCovers : undefined);
  const active =
    openId === "cover"
      ? { src: "/works/cover.jpg", w: 1810, h: 2560, title: t.coverTitle, alt: t.coverAlt }
      : piece
        ? { src: piece.src, w: piece.w, h: piece.h, title: piece.title[lang], alt: piece.alt[lang] }
        : null;

  return (
    <div className="bg-void text-bone">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-bone focus:px-4 focus:py-2 focus:text-void"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-30 border-b border-line bg-void">
        <div className="shell flex min-h-16 flex-wrap items-center gap-x-6 gap-y-3 py-3">
          <a href="#top" className="font-display text-xl tracking-tight">
            Cracked Empire
          </a>
          <nav
            className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 md:order-none md:w-auto md:flex-1 md:justify-end"
            aria-label={t.navWork}
          >
            <a href="#work" className="text-sm text-mist hover:text-bone">
              {t.navWork}
            </a>
            <a href="#almost" className="text-sm text-gold hover:text-bone">
              {t.navComic}
            </a>
            <a href="#order" className="text-sm text-mist hover:text-bone">
              {t.navCommission}
            </a>
            <a href="#pay" className="text-sm text-mist hover:text-bone">
              {t.navPay}
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="flex border border-line" role="group" aria-label={t.langLabel}>
              {(["en", "ru"] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={lang === id}
                  onClick={() => chooseLang(id)}
                  className={
                    lang === id
                      ? "h-11 px-3 text-sm font-semibold bg-bone text-void"
                      : "h-11 px-3 text-sm text-mist hover:text-bone"
                  }
                >
                  {id === "en" ? "EN" : "RU"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main id="content">
        <section id="top" className="shell grid items-start gap-10 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-14">
          <div className="lg:col-span-5">
            <p className="kicker text-gold">
              {t.kicker}
              <span className="text-mist"> · {t.alias}</span>
            </p>
            <h1 className="display mt-5">
              Cracked
              <br />
              <span className="italic">Empire</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-bone">{t.lede}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#order" className="inline-flex h-12 items-center bg-blood px-5 text-sm font-semibold text-on-blood">
                {t.ctaCommission}
              </a>
              <a
                href="#almost"
                className="inline-flex h-12 items-center border border-gold px-5 text-sm font-semibold text-gold hover:border-bone hover:text-bone"
              >
                {t.navComic}
              </a>
              <a
                href="#cover"
                className="inline-flex h-12 items-center border border-line px-5 text-sm font-semibold hover:border-bone"
              >
                {t.ctaCover}
              </a>
            </div>
          </div>

          <figure id="cover" className="scroll-mt-20 lg:col-span-6 lg:col-start-7">
            <button type="button" className="block w-full text-left" onClick={() => setOpenId("cover")}>
              <img
                src="/works/cover.jpg"
                alt={t.coverAlt}
                width={1810}
                height={2560}
                className="w-full bg-panel"
              />
            </button>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
              <p className="font-display text-2xl">{t.coverTitle}</p>
              <p className="kicker text-mist">{t.coverKicker}</p>
            </figcaption>
            <p className="mt-4 font-display text-xl italic leading-snug text-mist md:text-2xl">{t.quote}</p>
          </figure>
        </section>

        <section id="work" className="shell scroll-mt-20 py-16 md:py-24" aria-labelledby="works-title">
          <p className="kicker text-gold">{t.worksKicker}</p>
          <h2 id="works-title" className="mt-3 font-display text-4xl md:text-5xl">
            {t.worksTitle}
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {works.map((work) => (
              <li key={work.id}>
                <button type="button" className="block w-full text-left" onClick={() => setOpenId(work.id)}>
                  <img
                    src={work.src}
                    alt={work.alt[lang]}
                    width={work.w}
                    height={work.h}
                    className="w-full bg-panel"
                  />
                </button>
                <p className="mt-3 font-display text-2xl">{work.title[lang]}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="almost" className="border-y border-line" aria-labelledby="almost-title">
          <div className="shell py-16 md:py-24">
            <p className="kicker text-gold">{t.comicKicker}</p>
            <h2 id="almost-title" className="mt-3 font-display text-4xl md:text-6xl">
              {t.comicTitle}
            </h2>
            <div className="mt-10 max-w-3xl border border-line bg-panel">
              <div className="inline-flex border-r border-b border-line bg-void px-4 py-3">
                <p className="kicker text-gold">{t.comicFolder}</p>
              </div>
              <div className="p-5 md:p-8">
                <button type="button" className="block w-full text-left" onClick={() => setOpenId(almostCovers.id)}>
                  <img
                    src={almostCovers.src}
                    alt={almostCovers.alt[lang]}
                    width={almostCovers.w}
                    height={almostCovers.h}
                    className="w-full bg-void"
                  />
                </button>
                <p className="mt-4 font-display text-2xl">{almostCovers.title[lang]}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="shell py-16 md:py-24" aria-labelledby="subjects-title">
          <p className="kicker text-gold">{t.subjectsKicker}</p>
          <h2 id="subjects-title" className="mt-3 max-w-xl font-display text-4xl md:text-5xl">
            {t.subjectsTitle}
          </h2>
          <ul className="mt-10 grid gap-px bg-line sm:grid-cols-2">
            {t.subjects.map((item, index) => (
              <li key={item.title} className="bg-void p-6 md:p-8">
                <p className="font-display text-3xl text-gold">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-line" aria-labelledby="process-title">
          <div className="shell py-16 md:py-24">
            <h2 id="process-title" className="font-display text-4xl md:text-5xl">
              {t.processTitle}
            </h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3">
              {t.steps.map((step) => (
                <li key={step.no} className="border-t border-line pt-5">
                  <p className="font-display text-3xl text-gold">{step.no}</p>
                  <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-mist">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="order" className="shell scroll-mt-20 grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <p className="kicker text-gold">{t.orderKicker}</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">{t.orderTitle}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-mist">{t.orderLede}</p>

            <fieldset className="mt-8">
              <legend className="kicker text-mist">{t.scopeLegend}</legend>
              <div className="mt-3 grid gap-2">
                {t.scopes.map((item) => {
                  const active = scope === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setScope(item.id)}
                      className={
                        active
                          ? "flex h-14 items-center justify-between bg-bone px-4 text-left text-void"
                          : "flex h-14 items-center justify-between border border-line px-4 text-left hover:border-bone"
                      }
                    >
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span className={`text-sm ${active ? "text-void" : "text-mist"}`}>{item.note}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="kicker text-mist">{t.subjectLegend}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.subjectsChoice.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={subject === item.id}
                    onClick={() => setSubject(item.id)}
                    className={
                      subject === item.id
                        ? "h-11 bg-bone px-4 text-sm font-semibold text-void"
                        : "h-11 border border-line px-4 text-sm text-mist hover:text-bone"
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              aria-pressed={background}
              onClick={() => setBackground((value) => !value)}
              className={
                background
                  ? "mt-4 flex min-h-12 w-full items-center justify-between gap-3 bg-bone px-4 py-3 text-left text-sm font-semibold text-void"
                  : "mt-4 flex min-h-12 w-full items-center justify-between gap-3 border border-line px-4 py-3 text-left text-sm"
              }
            >
              <span>{t.background}</span>
              <span>{background ? t.backgroundOn : t.backgroundOff}</span>
            </button>
            <button
              type="button"
              aria-pressed={characters}
              onClick={() => setCharacters((value) => !value)}
              className={
                characters
                  ? "mt-2 flex min-h-12 w-full items-center justify-between gap-3 bg-bone px-4 py-3 text-left text-sm font-semibold text-void"
                  : "mt-2 flex min-h-12 w-full items-center justify-between gap-3 border border-line px-4 py-3 text-left text-sm"
              }
            >
              <span>{t.characters}</span>
              <span>{characters ? t.charactersOn : t.charactersOff}</span>
            </button>
            <button
              type="button"
              aria-pressed={mechanical}
              onClick={() => setMechanical((value) => !value)}
              className={
                mechanical
                  ? "mt-2 flex min-h-12 w-full items-center justify-between gap-3 bg-blood px-4 py-3 text-left text-sm font-semibold text-on-blood"
                  : "mt-2 flex min-h-12 w-full items-center justify-between gap-3 border border-line px-4 py-3 text-left text-sm"
              }
            >
              <span>{t.mechanical}</span>
              <span>{mechanical ? t.mechanicalOn : t.mechanicalOff}</span>
            </button>
            {mechanical ? <p className="mt-3 text-sm text-gold">{t.mechanicalNote}</p> : null}

            <p className="mt-8 font-display text-5xl tabular-nums">{formatUsd(quoteUsd(scope, background, characters))}</p>
            <p className="mt-2 text-sm text-mist">
              {t.priceLabel} · {t.priceAside}
            </p>

            <fieldset id="pay" className="mt-8 scroll-mt-24">
              <legend className="kicker text-mist">{t.payLegend}</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(
                  [
                    ["boosty", t.payBoosty, t.payBoostyNote],
                    ["bybit", t.payBybit, t.payBybitNote],
                  ] as const
                ).map(([id, label, note]) => {
                  const active = pay === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPay(id)}
                      className={
                        active
                          ? "flex h-16 flex-col items-start justify-center bg-bone px-4 text-left text-void"
                          : "flex h-16 flex-col items-start justify-center border border-line px-4 text-left hover:border-bone"
                      }
                    >
                      <span className="text-sm font-semibold">{label}</span>
                      <span className={`text-sm ${active ? "text-void" : "text-mist"}`}>{note}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <form onSubmit={submit} className="border border-line bg-panel p-5 md:p-8" noValidate>
              <h3 className="font-display text-3xl">{t.formTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{t.formHint}</p>
              <p className="mt-4 text-sm text-bone">
                {labelScope(scope)} · {formatUsd(quoteUsd(scope, background, characters))} · {labelSubject(subject)}
                {background ? ` · ${t.backgroundOn}` : ""}
                {characters ? ` · ${t.charactersOn}` : ""}
                {mechanical ? ` · ${t.summaryMechanical}` : ""} · {pay === "boosty" ? "Boosty" : "ByBit"}
              </p>

              <label className="mt-6 block">
                <span className="kicker text-mist">{t.nameLabel}</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                  autoComplete="name"
                  className="mt-2 w-full border-b border-line bg-transparent py-3 text-lg outline-none focus:border-bone"
                />
              </label>
              <label className="mt-4 block">
                <span className="kicker text-mist">{t.contactLabel}</span>
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  name="contact"
                  autoComplete="email"
                  className="mt-2 w-full border-b border-line bg-transparent py-3 text-lg outline-none focus:border-bone"
                />
              </label>
              <label className="mt-4 block">
                <span className="kicker text-mist">{t.aboutLabel}</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-y border-b border-line bg-transparent py-3 text-base leading-relaxed outline-none focus:border-bone"
                />
              </label>

              {formError ? (
                <p role="alert" className="mt-4 text-sm text-gold">
                  {formError}
                </p>
              ) : null}
              {notice ? (
                <p role="status" className="mt-4 text-sm">
                  {notice}
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-6 inline-flex h-12 items-center bg-blood px-5 text-sm font-semibold text-on-blood"
              >
                {t.submit}
              </button>
            </form>

            <div className="mt-8">
              <h3 className="font-display text-2xl">{t.inboxTitle}</h3>
              {!ready || inbox.length === 0 ? (
                <p className="mt-3 text-sm text-mist">{t.inboxEmpty}</p>
              ) : (
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {inbox.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-mist tabular-nums">{formatWhen(item.at, lang)}</p>
                      </div>
                      <p className="mt-1 text-sm text-mist">{item.contact}</p>
                      <p className="mt-2 text-sm">
                        {labelSubject(item.subject)} · {labelScope(item.scope)} ·{" "}
                        {formatUsd(item.price ?? quoteUsd(item.scope, item.background, item.characters))}
                        {item.background ? ` · ${t.backgroundOn}` : ""}
                        {item.characters ? ` · ${t.charactersOn}` : ""}
                        {item.mechanical ? ` · ${t.summaryMechanical}` : ""} · {item.pay === "boosty" ? "Boosty" : "ByBit"}
                      </p>
                      {item.message ? <p className="mt-2 text-sm leading-relaxed">{item.message}</p> : null}
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => copyBrief(item)}
                          className="h-10 border border-line px-3 text-sm hover:border-bone"
                        >
                          {t.copyBtn}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeInquiry(item.id)}
                          className="h-10 px-3 text-sm text-mist hover:text-bone"
                        >
                          {t.removeBtn}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <h3 className="font-display text-2xl">{t.payExplainTitle}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-mist">{t.payExplain}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="shell flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-4xl italic">Cracked Empire</p>
            <p className="mt-2 text-sm text-mist">{t.footerLine}</p>
          </div>
          <p className="text-sm text-mist">
            <a href="/edit" className="hover:text-bone">
              {lang === "ru" ? "Править" : "Edit"}
            </a>
            <span className="mx-2">·</span>
            {t.footerMeta}
          </p>
        </div>
      </footer>

      {active ? (
        <div
          className="veil fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpenId(null)}
        >
          <div className="flex max-h-full w-full max-w-3xl flex-col items-center gap-4" onClick={(event) => event.stopPropagation()}>
            <img src={active.src} alt={active.alt} width={active.w} height={active.h} className="lightbox-img" />
            <div className="flex w-full items-center justify-between gap-4 text-bone">
              <h2 id={titleId} className="font-display text-2xl">
                {active.title}
              </h2>
              <div className="flex items-center gap-2">
                {works.some((item) => item.id === openId) ? (
                  <>
                    <button
                      type="button"
                      aria-label={lang === "ru" ? "Предыдущая" : "Previous"}
                      onClick={() => {
                        const index = works.findIndex((item) => item.id === openId);
                        setOpenId(works[(index - 1 + works.length) % works.length].id);
                      }}
                      className="inline-flex h-11 w-11 items-center justify-center border border-line"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={lang === "ru" ? "Следующая" : "Next"}
                      onClick={() => {
                        const index = works.findIndex((item) => item.id === openId);
                        setOpenId(works[(index + 1) % works.length].id);
                      }}
                      className="inline-flex h-11 w-11 items-center justify-center border border-line"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="inline-flex h-11 items-center border border-line px-4 text-sm"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function formatWhen(iso: string, lang: Lang) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
