import { HERO_IMAGE } from "../data/products";
import Reveal from "./Reveal";
import { IconArrow, IconBean } from "./Icons";

function Stamp() {
  return (
    <div className="absolute -bottom-7 -left-4 h-28 w-28 animate-rot drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] sm:-left-9 sm:h-36 sm:w-36">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="stamp-circ" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" />
        </defs>
        <circle
          cx="50"
          cy="50"
          r="48"
          className="fill-espresso-900"
          stroke="#e8a33d"
          strokeWidth="1.3"
          strokeDasharray="3 3"
        />
        <text className="fill-cream" fontSize="7.4" letterSpacing="1.9" fontWeight="700">
          <textPath href="#stamp-circ">PRŽENO U PODGORICI · OD 2019 · ARABICA ·</textPath>
        </text>
        <g stroke="#e8a33d" strokeWidth="2" fill="none" strokeLinecap="round">
          <ellipse cx="50" cy="50" rx="8.5" ry="12.5" transform="rotate(24 50 50)" />
          <path
            d="M46 39.8c3.6 2.9 2.4 6.4 3.4 9.6 1 3.1 4.2 4.8 5 8.6"
            transform="rotate(24 50 50)"
          />
        </g>
      </svg>
    </div>
  );
}

const STATS = [
  { value: "6", label: "sorti single origin" },
  { value: "12 kg", label: "najveća serija prženja" },
  { value: "24 h", label: "dostava do primorja" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <IconBean className="pointer-events-none absolute left-[6%] top-24 hidden h-8 w-8 animate-drift text-espresso-600 lg:block" />
      <IconBean className="pointer-events-none absolute right-[8%] top-16 hidden h-6 w-6 animate-drift text-espresso-600 lg:block [animation-delay:1.4s]" />
      <IconBean className="pointer-events-none absolute bottom-24 left-[42%] hidden h-5 w-5 animate-drift text-espresso-700 lg:block [animation-delay:2.6s]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pt-16">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-amber">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-amber" />
              Pržionica kafe · Podgorica · od 2019.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.6rem] font-black leading-[1.04] text-cream sm:text-6xl lg:text-[4.2rem]">
              Pržena pod{" "}
              <em className="font-light italic text-amber">Goricom,</em>
              <br />
              ispijena uz{" "}
              <em className="font-light italic text-sea">more.</em>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-dim">
              Šest sorti specijalne kafe, prženih u malim serijama u Staroj
              Varoši. Svakog jutra naš kombi kreće ka primorju — Budva, Kotor,
              Bar — a miris se osjeti i prije nego što se šolja skuva.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#radnja"
                className="group flex items-center gap-2.5 rounded-md bg-amber px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-espresso-950 transition-all hover:bg-amber-soft hover:shadow-[0_12px_30px_-10px_rgba(232,163,61,0.55)] active:translate-y-px"
              >
                Pogledaj ponudu
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#prica"
                className="rounded-md border border-espresso-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-cream-dim transition-colors hover:border-amber hover:text-amber"
              >
                Naša priča
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-12 flex divide-x divide-espresso-700 border-y border-espresso-700 py-5">
              {STATS.map((s, i) => (
                <div key={s.label} className={`flex-1 ${i === 0 ? "pr-5" : "px-5"}`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-black text-cream sm:text-3xl">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-cream-faint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-5 rounded-t-full border border-dashed border-espresso-600/70" />
          <div className="relative overflow-hidden rounded-t-full border border-espresso-600 shadow-[0_50px_90px_-40px_rgba(0,0,0,0.9)]">
            <img
              src={HERO_IMAGE}
              alt="Pržionica Gorica — svježe pržena kafa i espresso na kamenu, sa pogledom na Boku"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[2500ms] ease-out hover:scale-[1.05]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/30 to-transparent p-5 pt-16">
              <p className="text-[11px] uppercase tracking-[0.24em] text-cream-dim">
                Pržionica · Stara Varoš · 07:15
              </p>
            </div>
          </div>
          <Stamp />
        </Reveal>
      </div>
    </section>
  );
}
