@import "tailwindcss";

@theme {
  --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Fraunces", "Iowan Old Style", Palatino, serif;

  --color-void: #110c0e;
  --color-panel: #1b1316;
  --color-bone: #f6eee9;
  --color-mist: #b5a39c;
  --color-line: #3d2c30;
  --color-blood: #b43330;
  --color-on-blood: #f8f1ee;
  --color-gold: #d7b56a;
}

@layer base {
  html {
    background: var(--color-void);
    color: var(--color-bone);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-sans);
    background: var(--color-void);
    color: var(--color-bone);
    min-height: 100vh;
  }

  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }

  h1,
  h2,
  h3 {
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  ::selection {
    background: var(--color-blood);
    color: var(--color-on-blood);
  }
}

.shell {
  width: 100%;
  max-width: 86rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

@media (min-width: 768px) {
  .shell {
    padding-inline: 2.5rem;
  }
}

.display {
  font-family: var(--font-display);
  font-weight: 560;
  letter-spacing: -0.04em;
  line-height: 0.86;
  font-size: clamp(4.25rem, 12vw, 7.5rem);
}

.kicker {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.veil {
  background: color-mix(in srgb, var(--color-void) 88%, transparent);
}

.lightbox-img {
  max-height: 78vh;
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
