import type { ResolvedCartItem } from "../types";
import { fmt, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../lib/utils";
import { IconArrow, IconBag, IconClose, IconMinus, IconPlus, IconTrash, IconTruck } from "./Icons";

interface Props {
  open: boolean;
  items: ResolvedCartItem[];
  subtotal: number;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  items,
  subtotal,
  onClose,
  onUpdateQty,
  onRemove,
  onCheckout,
}: Props) {
  const count = items.reduce((s, i) => s + i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={`fixed inset-0 z-[75] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-espresso-700 bg-espresso-900 shadow-[-30px_0_80px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Korpa"
      >
        <header className="flex items-center justify-between border-b border-espresso-700 px-6 py-5">
          <h2 className="font-display text-2xl font-black text-cream">
            Tvoja korpa{" "}
            {count > 0 && <span className="text-amber">({count})</span>}
          </h2>
          <button
            onClick={onClose}
            aria-label="Zatvori korpu"
            className="grid h-10 w-10 place-items-center rounded-md border border-espresso-600 text-cream-dim transition-colors hover:border-amber hover:text-amber"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-24 w-24 place-items-center rounded-full border border-dashed border-espresso-600">
              <IconBag className="h-10 w-10 text-cream-ghost" />
            </span>
            <p className="font-display text-2xl font-bold text-cream">Korpa je prazna</p>
            <p className="text-sm leading-relaxed text-cream-dim">
              Vrijeme je za prvu kafu — šest sorti čeka u radnji.
            </p>
            <button
              onClick={onClose}
              className="mt-2 flex items-center gap-2 rounded-md bg-amber px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-espresso-950 transition-colors hover:bg-amber-soft"
            >
              U radnju
              <IconArrow className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-espresso-700 px-6 py-4">
              {shipping === 0 ? (
                <p className="flex items-center gap-2 text-sm font-bold text-sea">
                  <IconTruck className="h-4.5 w-4.5" />
                  Dostava je besplatna — svaka čast!
                </p>
              ) : (
                <p className="flex items-center gap-2 text-sm font-semibold text-cream-dim">
                  <IconTruck className="h-4.5 w-4.5 text-amber" />
                  Još <strong className="text-amber">{fmt(remaining)}</strong> do besplatne dostave
                </p>
              )}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-espresso-700">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${shipping === 0 ? "bg-sea" : "bg-amber"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-espresso-800 overflow-y-auto px-6">
              {items.map((it) => (
                <li key={it.key} className="flex gap-4 py-5">
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    className="h-20 w-16 shrink-0 rounded-md border border-espresso-700 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-base font-bold text-cream">
                          {it.product.name}
                        </h3>
                        <p className="text-xs text-cream-faint">
                          {it.weight} · {fmt(it.unitPrice)}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(it.key)}
                        aria-label={`Ukloni ${it.product.name} iz korpe`}
                        className="shrink-0 text-cream-faint transition-colors hover:text-sienna"
                      >
                        <IconTrash className="h-4.5 w-4.5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border border-espresso-600">
                        <button
                          onClick={() => onUpdateQty(it.key, -1)}
                          aria-label="Smanji količinu"
                          className="p-2 text-cream-dim transition-colors hover:text-amber"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-extrabold text-cream">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(it.key, 1)}
                          aria-label="Povećaj količinu"
                          className="p-2 text-cream-dim transition-colors hover:text-amber"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-lg font-black text-cream">{fmt(it.lineTotal)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-espresso-700 bg-espresso-850 px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-cream-dim">
                  <dt>Međuzbir</dt>
                  <dd className="font-semibold text-cream">{fmt(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-cream-dim">
                  <dt>Dostava</dt>
                  <dd className={`font-semibold ${shipping === 0 ? "text-sea" : "text-cream"}`}>
                    {shipping === 0 ? "Besplatno" : fmt(shipping)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-dashed border-espresso-600 pt-3">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-cream-faint">Ukupno</dt>
                  <dd className="font-display text-2xl font-black text-amber">{fmt(subtotal + shipping)}</dd>
                </div>
              </dl>
              <button
                onClick={onCheckout}
                className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-md bg-amber px-5 py-4 text-sm font-extrabold uppercase tracking-wider text-espresso-950 transition-all hover:bg-amber-soft hover:shadow-[0_12px_30px_-10px_rgba(232,163,61,0.6)] active:translate-y-px"
              >
                Nastavi na plaćanje
                <IconArrow className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="mt-2.5 w-full rounded-md py-2 text-center text-xs font-bold uppercase tracking-wider text-cream-faint transition-colors hover:text-cream"
              >
                Nastavi kupovinu
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
