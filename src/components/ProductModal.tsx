import { useState } from "react";
import { BREW_LABELS, CATEGORY_LABELS, ROAST_LABELS } from "../data/products";
import type { Product, Weight } from "../types";
import { fmt, unitPrice } from "../lib/utils";
import { BrewIcon, IconBag, IconClose, IconMinus, IconPlus, RoastDots } from "./Icons";

interface Props {
  product: Product;
  onClose: () => void;
  onAdd: (p: Product, w: Weight, qty: number) => void;
}

const WEIGHTS: { id: Weight; label: string }[] = [
  { id: "250g", label: "250 g" },
  { id: "1kg", label: "1 kg" },
];

export default function ProductModal({ product, onClose, onAdd }: Props) {
  const [weight, setWeight] = useState<Weight>("250g");
  const [qty, setQty] = useState(1);
  const total = unitPrice(product, weight) * qty;
  const saving = Math.round((1 - product.price1kg / (product.price250 * 4)) * 100);

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="fixed inset-0 animate-fadein bg-black/70" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative grid w-full max-w-4xl animate-rise overflow-hidden rounded-xl border border-espresso-600 bg-espresso-900 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] md:grid-cols-2">
          <button
            onClick={onClose}
            aria-label="Zatvori detalje"
            className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-md border border-espresso-600 bg-espresso-950/85 text-cream-dim transition-colors hover:border-amber hover:text-amber"
          >
            <IconClose className="h-5 w-5" />
          </button>

          <div className="relative h-56 bg-espresso-850 sm:h-72 md:h-full">
            <img src={product.image} alt={`Pakovanje kafe ${product.name}`} className="absolute inset-0 h-full w-full object-cover" />
            {product.badge && (
              <span className="absolute left-4 top-4 -rotate-3 rounded-sm bg-amber px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-espresso-950 shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex max-h-[70vh] flex-col gap-5 overflow-y-auto p-6 md:max-h-[85vh] md:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-amber/50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber">
                  {CATEGORY_LABELS[product.category]}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-cream-faint">
                  {product.process}
                </span>
              </div>
              <h3 className="mt-3 font-display text-3xl font-black text-cream sm:text-4xl">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-cream-dim">{product.subtitle}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { k: "Porijeklo", v: product.origin },
                { k: "Proces", v: product.process },
                { k: "Visina", v: product.altitude },
              ].map((m) => (
                <div key={m.k} className="rounded-md border border-espresso-700 bg-espresso-850 p-2.5">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-cream-faint">{m.k}</p>
                  <p className="mt-1 text-xs font-bold leading-tight text-cream">{m.v}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.notes.map((n) => (
                <span
                  key={n}
                  className="rounded-full border px-3 py-1 text-xs font-bold"
                  style={{ borderColor: `${product.accent}66`, color: product.accent }}
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-cream-faint">Prženje</span>
              <RoastDots level={product.roast} />
              <span className="text-xs font-semibold text-cream-dim">{ROAST_LABELS[product.roast - 1]}</span>
            </div>

            <p className="text-sm leading-relaxed text-cream-dim">{product.description}</p>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-cream-faint">Pakovanje</p>
              <div className="grid grid-cols-2 gap-3">
                {WEIGHTS.map((w) => {
                  const active = weight === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWeight(w.id)}
                      aria-pressed={active}
                      className={`rounded-md border p-3.5 text-left transition-all ${
                        active
                          ? "border-amber bg-amber/10 shadow-[inset_0_0_0_1px_rgba(232,163,61,0.4)]"
                          : "border-espresso-600 hover:border-amber/60"
                      }`}
                    >
                      <span className="block font-display text-lg font-black text-cream">{w.label}</span>
                      <span className="mt-0.5 block text-sm font-bold text-amber">{fmt(unitPrice(product, w.id))}</span>
                      {w.id === "1kg" && (
                        <span className="mt-1 inline-block rounded-sm bg-amber/15 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber">
                          uštedi {saving}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 border-t border-espresso-700 pt-5 sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-center rounded-md border border-espresso-600">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Smanji količinu"
                  className="p-3 text-cream-dim transition-colors hover:text-amber disabled:opacity-30 disabled:hover:text-cream-dim"
                >
                  <IconMinus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-extrabold text-cream" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Povećaj količinu"
                  className="p-3 text-cream-dim transition-colors hover:text-amber"
                >
                  <IconPlus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => onAdd(product, weight, qty)}
                className="flex flex-1 items-center justify-center gap-2.5 rounded-md bg-amber px-5 py-3.5 text-sm font-extrabold uppercase tracking-wider text-espresso-950 transition-all hover:bg-amber-soft hover:shadow-[0_12px_30px_-10px_rgba(232,163,61,0.6)] active:translate-y-px"
              >
                <IconBag className="h-4.5 w-4.5" />
                Dodaj u korpu — {fmt(total)}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cream-faint">
                Preporučujemo za:
              </span>
              {product.brew.map((b) => (
                <span key={b} className="flex items-center gap-1.5 rounded-full border border-espresso-600 px-2.5 py-1 text-[11px] font-bold text-cream-dim">
                  <BrewIcon brew={b} className="h-3.5 w-3.5 text-amber" />
                  {BREW_LABELS[b]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
