import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/client";
import { OWNER_EMAIL, readLang } from "@/data/studio";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: "Sign in — Cracked Empire" }],
  }),
});

function Login() {
  const navigate = useNavigate();
  const [ru, setRu] = useState(false);
  const [mode, setMode] = useState<"in" | "up">("up");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setRu(readLang() === "ru");
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (password.length < 8) {
      setError(ru ? "Пароль — минимум 8 символов." : "Password needs at least 8 characters.");
      return;
    }
    setPending(true);
    setError("");
    const result =
      mode === "up"
        ? await authClient.signUp.email({
            email: OWNER_EMAIL,
            password,
            name: "Cracked Empire",
          })
        : await authClient.signIn.email({
            email: OWNER_EMAIL,
            password,
          });
    setPending(false);
    if (result.error) {
      setError(result.error.message ?? (ru ? "Не вышло войти." : "Could not sign in."));
      return;
    }
    await navigate({ to: "/edit" });
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <form onSubmit={submit} className="w-full max-w-md border border-line bg-panel p-6 md:p-8" noValidate>
        <p className="kicker text-gold">{ru ? "Только владелец" : "Owner only"}</p>
        <h1 className="mt-3 font-display text-4xl">{ru ? "Вход" : "Sign in"}</h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          {ru
            ? "Пароль задаёте вы. Другая почта войти не сможет."
            : "You choose the password. No other email can sign in."}
        </p>
        <label className="mt-6 block">
          <span className="kicker text-mist">{ru ? "Почта" : "Email"}</span>
          <input
            value={OWNER_EMAIL}
            readOnly
            className="mt-2 w-full border-b border-line bg-transparent py-3 text-bone outline-none"
          />
        </label>
        <label className="mt-4 block">
          <span className="kicker text-mist">{ru ? "Пароль" : "Password"}</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            name="password"
            autoComplete={mode === "up" ? "new-password" : "current-password"}
            className="mt-2 w-full border-b border-line bg-transparent py-3 text-lg outline-none focus:border-bone"
          />
        </label>
        {error ? (
          <p role="alert" className="mt-4 text-sm text-gold">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex h-12 items-center bg-blood px-5 text-sm font-semibold text-on-blood disabled:opacity-60"
        >
          {pending
            ? ru
              ? "Секунду…"
              : "One moment…"
            : mode === "up"
              ? ru
                ? "Создать пароль"
                : "Create password"
              : ru
                ? "Войти"
                : "Sign in"}
        </button>
        <button
          type="button"
          className="mt-4 block text-sm text-mist underline-offset-4 hover:text-bone hover:underline"
          onClick={() => {
            setMode((value) => (value === "up" ? "in" : "up"));
            setError("");
          }}
        >
          {mode === "up"
            ? ru
              ? "Уже задавали пароль? Войти"
              : "Already set a password? Sign in"
            : ru
              ? "Первый раз? Создать пароль"
              : "First time? Create a password"}
        </button>
        <a href="/" className="mt-6 inline-block text-sm text-mist hover:text-bone">
          {ru ? "На сайт" : "Back to the site"}
        </a>
      </form>
    </main>
  );
}
