import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  OWNER_EMAIL,
  copy,
  draftFromCopy,
  mergeCopy,
  readLang,
  type Lang,
  type LangOverride,
  type SiteOverrides,
} from "@/data/studio";
import { loadSiteCopy, saveSiteCopy } from "@/lib/site-copy";

export const Route = createFileRoute("/edit")({
  component: EditPage,
  head: () => ({
    meta: [{ title: "Edit — Cracked Empire" }],
  }),
});

function EditPage() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [lang, setLang] = useState<Lang>("en");
  const [stored, setStored] = useState<SiteOverrides>({});
  const [draft, setDraft] = useState<LangOverride | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loaded = useRef(false);

  useEffect(() => {
    setLang(readLang());
  }, []);

  useEffect(() => {
    if (isPending || loaded.current) return;
    if (!user) {
      void navigate({ to: "/login" });
      return;
    }
    if (user.primaryEmail?.toLowerCase() !== OWNER_EMAIL) return;
    loaded.current = true;
    const initial = readLang();
    loadSiteCopy()
      .then((body) => {
        setStored(body);
        setLang(initial);
        setDraft(draftFromCopy(mergeCopy(copy[initial], body[initial])));
      })
      .catch(() => {
        setDraft(draftFromCopy(copy[initial]));
      });
  }, [isPending, user, navigate]);

  if (isPending || !user) return null;

  const ru = lang === "ru";
  const owner = user.primaryEmail?.toLowerCase() === OWNER_EMAIL;

  function switchLang(next: Lang) {
    setLang(next);
    document.documentElement.lang = next;
    localStorage.setItem("cracked-empire-lang", next);
    setDraft(draftFromCopy(mergeCopy(copy[next], stored[next])));
    setNotice("");
    setError("");
  }

  function updateField(key: keyof LangOverride, value: string) {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError("");
    setNotice("");
    const next = { ...stored, [lang]: draft };
    try {
      await saveSiteCopy({ data: next });
      setStored(next);
      setNotice(ru ? "Сохранено. Так сайт видят все." : "Saved. This is what everyone sees.");
    } catch {
      setError(ru ? "Не сохранилось. Войдите с вашей почты." : "Could not save. Sign in with your email.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="shell py-10 md:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a href="/" className="font-display text-xl">
          Cracked Empire
        </a>
        <UserButton />
      </div>

      {!owner ? (
        <p className="mt-10 max-w-md text-mist">
          {ru
            ? "Этот аккаунт не может править сайт. Нужна почта владельца."
            : "This account cannot edit the site. It has to be the owner email."}
        </p>
      ) : (
        <>
          <p className="kicker mt-10 text-gold">{ru ? "Правка" : "Edit"}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            {ru ? "Тексты сайта" : "Site text"}
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist">
            {ru
              ? "Меняете то, что видят гости. Картинки сюда не загружаются — их присылайте в чат."
              : "This changes what visitors read. Pictures are not uploaded here — send those in the chat."}
          </p>
          <div className="mt-6 flex border border-line w-fit" role="group" aria-label={ru ? "Язык" : "Language"}>
            {(["en", "ru"] as const).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={lang === id}
                onClick={() => switchLang(id)}
                className={
                  lang === id
                    ? "h-11 bg-bone px-3 text-sm font-semibold text-void"
                    : "h-11 px-3 text-sm text-mist"
                }
              >
                {id === "en" ? "EN" : "RU"}
              </button>
            ))}
          </div>

          {draft ? (
            <div className="mt-8 grid max-w-2xl gap-5">
              <Field label={ru ? "Вступление" : "Intro"} value={draft.lede ?? ""} onChange={(value) => updateField("lede", value)} />
              <Field label={ru ? "Цитата" : "Quote"} value={draft.quote ?? ""} onChange={(value) => updateField("quote", value)} />
              <Field
                label={ru ? "Название обложки" : "Cover title"}
                value={draft.coverTitle ?? ""}
                onChange={(value) => updateField("coverTitle", value)}
              />
              <Field
                label={ru ? "Заголовок «что рисую»" : "What I draw heading"}
                value={draft.subjectsTitle ?? ""}
                onChange={(value) => updateField("subjectsTitle", value)}
              />
              {draft.subjects?.map((item, index) => (
                <div key={index} className="grid gap-3 border-t border-line pt-4">
                  <Field
                    label={`${ru ? "Блок" : "Block"} ${index + 1}`}
                    value={item.title}
                    onChange={(value) =>
                      setDraft((current) => {
                        if (!current?.subjects) return current;
                        const subjects = current.subjects.map((row, i) => (i === index ? { ...row, title: value } : row));
                        return { ...current, subjects };
                      })
                    }
                  />
                  <Field
                    label={ru ? "Текст" : "Text"}
                    value={item.text}
                    rows={3}
                    onChange={(value) =>
                      setDraft((current) => {
                        if (!current?.subjects) return current;
                        const subjects = current.subjects.map((row, i) => (i === index ? { ...row, text: value } : row));
                        return { ...current, subjects };
                      })
                    }
                  />
                </div>
              ))}
              {draft.steps?.map((item, index) => (
                <div key={index} className="grid gap-3 border-t border-line pt-4">
                  <Field
                    label={`${ru ? "Шаг" : "Step"} ${index + 1}`}
                    value={item.title}
                    onChange={(value) =>
                      setDraft((current) => {
                        if (!current?.steps) return current;
                        const steps = current.steps.map((row, i) => (i === index ? { ...row, title: value } : row));
                        return { ...current, steps };
                      })
                    }
                  />
                  <Field
                    label={ru ? "Текст шага" : "Step text"}
                    value={item.text}
                    rows={3}
                    onChange={(value) =>
                      setDraft((current) => {
                        if (!current?.steps) return current;
                        const steps = current.steps.map((row, i) => (i === index ? { ...row, text: value } : row));
                        return { ...current, steps };
                      })
                    }
                  />
                </div>
              ))}
              <Field
                label={ru ? "Текст заказа" : "Commission note"}
                value={draft.orderLede ?? ""}
                rows={3}
                onChange={(value) => updateField("orderLede", value)}
              />
              <Field
                label={ru ? "Оплата" : "Payment"}
                value={draft.payExplain ?? ""}
                rows={3}
                onChange={(value) => updateField("payExplain", value)}
              />
              <Field
                label={ru ? "Подвал" : "Footer"}
                value={draft.footerLine ?? ""}
                onChange={(value) => updateField("footerLine", value)}
              />
              <Field
                label={ru ? "Строка оплаты" : "Payment line"}
                value={draft.footerMeta ?? ""}
                onChange={(value) => updateField("footerMeta", value)}
              />
              {error ? (
                <p role="alert" className="text-sm text-gold">
                  {error}
                </p>
              ) : null}
              {notice ? (
                <p role="status" className="text-sm">
                  {notice}
                </p>
              ) : null}
              <button
                type="button"
                disabled={saving}
                onClick={() => void save()}
                className="inline-flex h-12 w-fit items-center bg-blood px-5 text-sm font-semibold text-on-blood disabled:opacity-60"
              >
                {saving ? (ru ? "Сохраняю…" : "Saving…") : ru ? "Сохранить" : "Save"}
              </button>
            </div>
          ) : (
            <p className="mt-8 text-sm text-mist">{ru ? "Загружаю…" : "Loading…"}</p>
          )}
        </>
      )}
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="kicker text-mist">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-y border-b border-line bg-transparent py-3 leading-relaxed outline-none focus:border-bone"
      />
    </label>
  );
}
