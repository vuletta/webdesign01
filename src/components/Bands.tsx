import Reveal from "./Reveal";
import { IconBean, IconTruck, IconWave } from "./Icons";

const ORIGINS = [
  "Etiopija · Yirgacheffe",
  "Brazil · Cerrado",
  "Kolumbija · Huila",
  "Honduras · Marcala",
];

const PILLARS = [
  {
    title: "Direktna trgovina",
    text: "Farmerima plaćamo dva do tri puta više od berzanske cijene — i znamo ime svakog od njih.",
  },
  {
    title: "Male serije",
    text: "Najviše 12 kg po prženju, uz kontrolu profila temperature u realnom vremenu.",
  },
  {
    title: "Mljeveno po želji",
    text: "Za espresso, V60, french press ili đezvu — sameljemo onako kako ti treba.",
  },
  {
    title: "Degustacija petkom",
    text: "Svakog petka u 18h otvaramo pržionicu za sve. Ulaz slobodan, kafa besplatna.",
  },
];

export function Story() {
  return (
    <section id="prica" className="relative border-y border-espresso-800 bg-espresso-900/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-amber">
              01 · Naša priča
            </p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-cream sm:text-5xl">
              Bez prečica — <em className="font-light italic text-amber">od plantaže do šolje.</em>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
              Počelo je 2019. sa polovnim pržionikom od 5 kg u garaži pod
              Goricom i uvjerenjem da Crna Gora zaslužuje bolju kafu. Danas
              pržimo za kafiće od Herceg Novog do Ulcinja, ali svaka vreća i
              dalje prolazi kroz naše ruke.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-3">
              {ORIGINS.map((o, i) => (
                <span
                  key={o}
                  className={`rounded-sm border border-dashed border-cream-ghost px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cream-dim transition-colors hover:border-amber hover:text-amber ${
                    i % 2 === 0 ? "-rotate-1" : "rotate-1"
                  }`}
                >
                  {o}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <ul className="flex h-full flex-col justify-center gap-7">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <li className="flex gap-4 border-b border-espresso-700/80 pb-7 last:border-0 last:pb-0">
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-espresso-600 text-amber">
                    <IconBean className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream-dim">{p.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const COAST = [
  "Dostava do mora",
  "Budva",
  "Kotor",
  "Tivat",
  "Herceg Novi",
  "Bar",
  "Ulcinj",
  "Petrovac",
  "Besplatno preko 35 €",
];

export function CoastBand() {
  return (
    <section
      id="dostava"
      className="marquee overflow-hidden border-y border-espresso-700 bg-gradient-to-r from-espresso-900 via-[#15201c] to-espresso-900 py-4"
    >
      <div className="marquee-track flex w-max animate-marquee-rev items-center">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center" aria-hidden={k === 1}>
            {COAST.map((c, i) => (
              <span
                key={`${c}-${k}`}
                className="flex items-center gap-4 pr-4 text-sm font-bold uppercase tracking-[0.22em]"
              >
                <span className={i === 0 ? "text-sea" : "text-cream-dim"}>{c}</span>
                {i === 0 ? (
                  <IconTruck className="h-4 w-4 shrink-0 text-sea" />
                ) : (
                  <IconWave className="h-4 w-4 shrink-0 text-sea/60" />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
