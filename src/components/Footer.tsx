import { useState, type FormEvent } from "react";
import {
  IconArrow,
  IconBean,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconTruck,
} from "./Icons";

interface Props {
  onToast: (text: string) => void;
}

export default function Footer({ onToast }: Props) {
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      onToast("Unesi ispravnu email adresu.");
      return;
    }
    setEmail("");
    onToast("Hvala! Prva serija novosti stiže na tvoj email.");
  };

  return (
    <footer id="kontakt" className="relative scroll-mt-20 overflow-hidden border-t border-espresso-800 bg-espresso-900/50">
      <p
        aria-hidden="true"
        className="text-hollow pointer-events-none select-none text-center font-display text-[21vw] font-black leading-[0.82] lg:text-[12rem]"
      >
        GORICA
      </p>

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-4 sm:px-6 lg:pt-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-amber text-espresso-950">
                <IconBean className="h-4.5 w-4.5" />
              </span>
              <span className="font-display text-lg font-black tracking-wide text-cream">GORICA</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-cream-dim">
              Specijalna kafa, pržena u malim serijama u srcu Podgorice. Od 2019.
              za Crnu Goru koja pije bolju kafu — od Gornjeg grada do Boke.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber">
              Posjetite nas
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream-dim">
              <li className="flex gap-3">
                <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cream-faint" />
                <span>
                  Bul. Stanka Dragojevića 12<br />
                  81000 Podgorica
                </span>
              </li>
              <li className="flex gap-3">
                <IconClock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cream-faint" />
                <span>
                  Pon–Sub · 08–20h
                  <br />
                  <span className="text-cream-faint">Degustacija petkom u 18h</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber">Dostava</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream-dim">
              <li className="flex gap-3">
                <IconTruck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cream-faint" />
                <span>
                  Podgorica — istog dana
                  <br />
                  Primorje — 24h · Sjever — 48h
                </span>
              </li>
              <li className="flex gap-3">
                <IconBean className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cream-faint" />
                <span>
                  Besplatno preko <strong className="text-cream">35 €</strong>
                  <br />
                  <span className="text-cream-faint">Plaćanje: pouzeće · Visa · Mastercard</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber">
              Ostani u toku
            </h3>
            <p className="mt-4 text-sm text-cream-dim">
              Nove serije, recepti i datumi prženja — jednom mjesečno, bez spama.
            </p>
            <form onSubmit={subscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tvoj@email.me"
                aria-label="Email za novosti"
                className="min-w-0 flex-1 rounded-md border border-espresso-600 bg-espresso-850 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-ghost transition-colors focus:border-amber focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Prijavi se"
                className="grid h-10 w-11 shrink-0 place-items-center rounded-md bg-amber text-espresso-950 transition-colors hover:bg-amber-soft"
              >
                <IconArrow className="h-4 w-4" />
              </button>
            </form>
            <ul className="mt-5 space-y-2.5 text-sm text-cream-dim">
              <li className="flex items-center gap-3">
                <IconPhone className="h-4 w-4 shrink-0 text-cream-faint" />
                <a href="tel:+38220655012" className="transition-colors hover:text-amber">
                  +382 20 655 012
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconMail className="h-4 w-4 shrink-0 text-cream-faint" />
                <a href="mailto:zdravo@gorica.cafe" className="transition-colors hover:text-amber">
                  zdravo@gorica.cafe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-espresso-800 pt-6 text-xs text-cream-faint sm:flex-row">
          <p>© 2026 Gorica d.o.o. — Pržionica kafe, Podgorica</p>
          <p className="flex items-center gap-1.5">
            Napravljeno s ljubavlju u PG
            <IconBean className="h-3.5 w-3.5 text-amber" />
            između kamena i mora
          </p>
        </div>
      </div>
    </footer>
  );
}
