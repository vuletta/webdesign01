import { useMemo } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import type { Category, Product } from "../types";
import { fmt } from "../lib/utils";
import Reveal from "./Reveal";
import { IconBag, IconBean, IconChevron, IconPlus, IconSearch, RoastDots } from "./Icons";

export type SortKey = "featured" | "asc" | "desc";
export type CatFilter = "sve" | Category;

interface Props {
  query: string;
  setQuery: (v: string) => void;
  cat: CatFilter;
  setCat: (c: CatFilter) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export default function Shop({
  query,
  setQuery,
  cat,
  setCat,
  sort,
  setSort,
  onOpen,
  onQuickAdd,
}: Props) {
  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => cat === "sve" || p.category === cat);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.origin, p.subtitle, p.process, ...p.notes]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    if (sort === "asc") list = [...list].sort((a, b) => a.price250 - b.price250);
    if (sort === "desc") list = [...list].sort((a, b) => b.price250 - a.price250);
    return list;
  }, [query, cat, sort]);

  const countFor = (id: CatFilter) =>
    id === "sve" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === id).length;

  return (
    <section id="radnja" className="relative scroll-mt-20 overflow-x-clip">
      <span
        aria-hidden="true"
        className="text-hollow pointer-events-none absolute -top-6 right-0 select-none font-display text-[26vw] font-black leading-none opacity-60 lg:text-[13rem]"
      >
        Kafa
      </span>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-amber">
                02 · Radnja
              </p>
              <h2 className="mt-4 font-display text-3xl font-black leading-tight text-cream sm:text-5xl">
                Šest sorti, <em className="font-light italic text-amber">svježe prženo.</em>
              </h2>
            </div>
            <p className="max-w-xs pb-1 text-sm leading-relaxed text-cream-dim">
              Svaka vreća se prži najviše sedam dana prije slanja. Datum prženja
              štampamo na poleđini.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="group relative flex-1">
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-cream-faint transition-colors group-focus-within:text-amber" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Pretraži kafu, porijeklo ili note… (npr. „čokolada“)`}
                aria-label="Pretraga kafe"
                className="w-full rounded-md border border-espresso-600 bg-espresso-900 py-3 pl-10 pr-4 text-sm text-cream placeholder:text-cream-faint transition-colors focus:border-amber focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
            </label>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sortiranje"
                className="w-full appearance-none rounded-md border border-espresso-600 bg-espresso-900 py-3 pl-4 pr-10 text-sm font-semibold text-cream transition-colors focus:border-amber focus:outline-none lg:w-52"
              >
                <option value="featured">Izdvojeno</option>
                <option value="asc">Cijena: rastuće</option>
                <option value="desc">Cijena: opadajuće</option>
              </select>
              <IconChevron className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-faint" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="no-scrollbar mt-5 flex gap-2.5 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  aria-pressed={active}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                    active
                      ? "border-amber bg-amber text-espresso-950 shadow-[0_6px_18px_-6px_rgba(232,163,61,0.6)]"
                      : "border-espresso-600 text-cream-dim hover:border-amber/70 hover:text-amber"
                  }`}
                >
                  {c.label}
                  <span
                    className={`rounded-full px-1.5 py-px text-[10px] font-extrabold ${
                      active ? "bg-espresso-950/15 text-espresso-950" : "bg-espresso-800 text-cream-faint"
                    }`}
                  >
                    {countFor(c.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-cream-faint" aria-live="polite">
          Prikazano {results.length} od {PRODUCTS.length} sorti
        </p>

        {results.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-lg border border-dashed border-espresso-600 px-6 py-20 text-center">
            <IconBean className="h-10 w-10 text-cream-ghost" />
            <p className="font-display text-2xl font-bold text-cream">
              Nijedna kafa ne odgovara pretrazi
            </p>
            <p className="max-w-sm text-sm text-cream-dim">
              Probaj drugi pojam — npr. „med“, „Etiopija“ ili „espresso“ — ili
              poništi filtere.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCat("sve");
              }}
              className="mt-2 rounded-md border border-amber px-5 py-2.5 text-sm font-bold text-amber transition-colors hover:bg-amber hover:text-espresso-950"
            >
              Poništi filtere
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {results.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
                <article
                  onClick={() => onOpen(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpen(p);
                    }
                  }}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-espresso-700 bg-espresso-900 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber/60 hover:shadow-[0_24px_50px_-20px_rgba(232,163,61,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-espresso-850">
                    <img
                      src={p.image}
                      alt={`Pakovanje kafe ${p.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-espresso-950/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {p.badge && (
                      <span className="absolute left-3 top-3 -rotate-3 rounded-sm bg-amber px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-espresso-950 shadow-lg">
                        {p.badge}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAdd(p);
                      }}
                      aria-label={`Brzo dodaj ${p.name} u korpu`}
                      className="absolute bottom-3 right-3 flex translate-y-0 items-center gap-1.5 rounded-md bg-amber px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-espresso-950 opacity-100 shadow-lg transition-all duration-300 hover:bg-amber-soft active:scale-95 lg:translate-y-16 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                    >
                      <IconBag className="h-4 w-4" />
                      Dodaj
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cream-faint">
                        {p.subtitle.split("·")[0]}
                      </span>
                      <RoastDots level={p.roast} />
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-cream transition-colors group-hover:text-amber sm:text-[1.35rem]">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[13px] leading-snug text-cream-dim">
                      {p.origin} · {p.notes.slice(0, 2).join(", ")}
                    </p>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <p>
                        <span className="font-display text-xl font-black text-cream sm:text-2xl">
                          {fmt(p.price250)}
                        </span>
                        <span className="ml-1 text-xs text-cream-faint">/ 250 g</span>
                      </p>
                      <span className="flex items-center gap-1 text-xs font-bold text-cream-faint transition-colors group-hover:text-amber">
                        Detalji
                        <IconPlus className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
