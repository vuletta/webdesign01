import { IconBag, IconBean } from "./Icons";

interface Props {
  cartCount: number;
  onCartOpen: () => void;
}

const TICKER = [
  "Prženo u Podgorici",
  "100% arabica",
  "Svježe prženje svakog utorka",
  "Dostava za cijelu Crnu Goru",
  "Besplatna dostava preko 35 €",
  "Od 2019. godine",
];

const NAV = [
  { href: "#radnja", label: "Radnja" },
  { href: "#prica", label: "Naša priča" },
  { href: "#dostava", label: "Dostava" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header({ cartCount, onCartOpen }: Props) {
  return (
    <>
      <div className="marquee overflow-hidden border-b border-dashed border-espresso-700 bg-espresso-900 py-2">
        <div className="marquee-track flex w-max animate-marquee items-center">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center" aria-hidden={k === 1}>
              {TICKER.map((t) => (
                <span
                  key={`${t}-${k}`}
                  className="flex items-center gap-3 pr-3 text-[11px] font-bold uppercase tracking-[0.22em] text-cream-dim"
                >
                  {t}
                  <IconBean className="h-3 w-3 shrink-0 text-amber" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-espresso-800 bg-espresso-950/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-amber text-espresso-950 transition-transform duration-300 group-hover:rotate-[20deg]">
              <IconBean className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-black tracking-wide text-cream">
                GORICA
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-cream-faint">
                pržionica kafe · PG
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-cream-dim md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-amber">
                {n.label}
              </a>
            ))}
          </nav>

          <button
            onClick={onCartOpen}
            aria-label="Otvori korpu"
            className="relative flex items-center gap-2.5 rounded-md border border-espresso-600 px-3.5 py-2.5 text-sm font-bold text-cream transition-all hover:border-amber hover:text-amber"
          >
            <IconBag className="h-5 w-5" />
            <span className="hidden sm:inline">Korpa</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="absolute -right-2 -top-2 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-amber px-1 text-[11px] font-extrabold text-espresso-950"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
