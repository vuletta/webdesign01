import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ResolvedCartItem } from "../types";
import { CITIES } from "../data/products";
import { fmt, genOrderNo } from "../lib/utils";
import {
  IconArrow,
  IconCard,
  IconCash,
  IconCheck,
  IconChevron,
  IconClose,
  IconTruck,
} from "./Icons";

interface Props {
  items: ResolvedCartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

type Method = "pouzece" | "kartica";

interface FormState {
  ime: string;
  email: string;
  telefon: string;
  grad: string;
  adresa: string;
  napomena: string;
  method: Method;
  kartica: string;
  expiry: string;
  cvc: string;
}

interface Receipt {
  orderNo: string;
  total: number;
  methodLabel: string;
  grad: string;
  eta: string;
  email: string;
  ime: string;
}

const STEPS = ["Podaci", "Plaćanje", "Potvrda"];
const COAST = ["Budva", "Kotor", "Tivat", "Herceg Novi", "Bar", "Ulcinj", "Petrovac"];

const etaFor = (grad: string): string => {
  if (grad === "Podgorica") return "Danas, u roku od 2 sata";
  if (COAST.includes(grad)) return "Sutra do 12h";
  return "1–2 radna dana";
};

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-cream-faint">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-bold text-sienna">{error}</span>}
    </label>
  );
}

export default function CheckoutModal({
  items,
  subtotal,
  shipping,
  total,
  onClose,
  onComplete,
}: Props) {
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [form, setForm] = useState<FormState>({
    ime: "",
    email: "",
    telefon: "",
    grad: "",
    adresa: "",
    napomena: "",
    method: "pouzece",
    kartica: "",
    expiry: "",
    cvc: "",
  });
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!e[k]) return e;
      const n = { ...e };
      delete n[k];
      return n;
    });
  };

  const inputCls = (k: string) =>
    `w-full rounded-md border bg-espresso-850 px-3.5 py-3 text-sm text-cream placeholder:text-cream-ghost transition-colors focus:outline-none ${
      errors[k] ? "border-sienna" : "border-espresso-600 focus:border-amber"
    }`;

  const validateInfo = (): boolean => {
    const e: Record<string, string> = {};
    if (form.ime.trim().length < 2) e.ime = "Upiši ime i prezime.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Upiši ispravnu email adresu.";
    if (form.telefon.replace(/\D/g, "").length < 6) e.telefon = "Upiši broj telefona.";
    if (!form.grad) e.grad = "Izaberi grad.";
    if (form.adresa.trim().length < 4) e.adresa = "Upiši ulicu i broj.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePay = (): boolean => {
    if (form.method !== "kartica") return true;
    const e: Record<string, string> = {};
    if (form.kartica.replace(/\s/g, "").length !== 16) e.kartica = "Broj kartice ima 16 cifara.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) e.expiry = "Format MM/GG.";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 cifre.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && validateInfo()) setStep(1);
  };

  const confirm = () => {
    if (!validatePay()) return;
    setProcessing(true);
    timer.current = window.setTimeout(() => {
      setReceipt({
        orderNo: genOrderNo(),
        total,
        methodLabel: form.method === "pouzece" ? "Pouzeće (gotovina)" : "Kartica (simulirano)",
        grad: form.grad,
        eta: etaFor(form.grad),
        email: form.email,
        ime: form.ime.split(" ")[0],
      });
      onComplete();
      setStep(2);
      setProcessing(false);
    }, 1700);
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Plaćanje">
      <div className="fixed inset-0 animate-fadein bg-black/75" onClick={processing ? undefined : onClose} />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-2xl animate-rise overflow-hidden rounded-xl border border-espresso-600 bg-espresso-900 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
          {step < 2 && (
            <button
              onClick={onClose}
              disabled={processing}
              aria-label="Zatvori plaćanje"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-md border border-espresso-600 bg-espresso-950/85 text-cream-dim transition-colors hover:border-amber hover:text-amber disabled:opacity-40"
            >
              <IconClose className="h-5 w-5" />
            </button>
          )}

          {step < 2 ? (
            <>
              <header className="border-b border-espresso-700 px-6 py-5 sm:px-8">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-amber">
                  Sigurna simulacija plaćanja
                </p>
                <h2 className="mt-1 font-display text-2xl font-black text-cream sm:text-3xl">
                  {step === 0 ? "Podaci za dostavu" : "Način plaćanja"}
                </h2>
                <ol className="mt-4 flex items-center gap-2.5">
                  {STEPS.map((s, i) => (
                    <li key={s} className={`flex items-center gap-2.5 ${i < 2 ? "flex-1" : ""}`}>
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-extrabold transition-colors ${
                          i < step
                            ? "border-sea text-sea"
                            : i === step
                              ? "border-amber bg-amber text-espresso-950"
                              : "border-espresso-600 text-cream-faint"
                        }`}
                      >
                        {i < step ? <IconCheck className="h-3.5 w-3.5" /> : i + 1}
                      </span>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          i === step ? "text-cream" : "text-cream-faint"
                        }`}
                      >
                        {s}
                      </span>
                      {i < 2 && (
                        <span className={`h-px flex-1 ${i < step ? "bg-sea" : "bg-espresso-600"}`} />
                      )}
                    </li>
                  ))}
                </ol>
              </header>

              {step === 0 ? (
                <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 sm:px-8">
                  <Field label="Ime i prezime" error={errors.ime} className="sm:col-span-2">
                    <input
                      className={inputCls("ime")}
                      value={form.ime}
                      onChange={(e) => set("ime", e.target.value)}
                      placeholder="npr. Milica Petrović"
                      autoFocus
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      className={inputCls("email")}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="milica@primjer.me"
                    />
                  </Field>
                  <Field label="Telefon" error={errors.telefon}>
                    <input
                      type="tel"
                      className={inputCls("telefon")}
                      value={form.telefon}
                      onChange={(e) => set("telefon", e.target.value)}
                      placeholder="+382 6x xxx xxx"
                    />
                  </Field>
                  <Field label="Grad" error={errors.grad}>
                    <span className="relative block">
                      <select
                        className={`${inputCls("grad")} appearance-none pr-10 ${form.grad ? "" : "text-cream-ghost"}`}
                        value={form.grad}
                        onChange={(e) => set("grad", e.target.value)}
                      >
                        <option value="" disabled>
                          Izaberi grad
                        </option>
                        {CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <IconChevron className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-faint" />
                    </span>
                  </Field>
                  <Field label="Adresa" error={errors.adresa}>
                    <input
                      className={inputCls("adresa")}
                      value={form.adresa}
                      onChange={(e) => set("adresa", e.target.value)}
                      placeholder="Ulica i broj"
                    />
                  </Field>
                  <Field label="Napomena (opciono)" className="sm:col-span-2">
                    <textarea
                      className={`${inputCls("napomena")} min-h-20 resize-none`}
                      value={form.napomena}
                      onChange={(e) => set("napomena", e.target.value)}
                      placeholder="npr. pozovi prije dostave"
                    />
                  </Field>
                </div>
              ) : (
                <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_260px]">
                  <div className="space-y-3">
                    {(
                      [
                        {
                          id: "pouzece",
                          icon: <IconCash className="h-5 w-5" />,
                          title: "Pouzeće",
                          sub: "Plaćaš gotovinom pri preuzimanju paketa.",
                        },
                        {
                          id: "kartica",
                          icon: <IconCard className="h-5 w-5" />,
                          title: "Karticom online",
                          sub: "Visa / Mastercard — simulirano plaćanje.",
                        },
                      ] as const
                    ).map((m) => {
                      const active = form.method === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => set("method", m.id)}
                          aria-pressed={active}
                          className={`flex w-full items-center gap-4 rounded-md border p-4 text-left transition-all ${
                            active
                              ? "border-amber bg-amber/10 shadow-[inset_0_0_0_1px_rgba(232,163,61,0.4)]"
                              : "border-espresso-600 hover:border-amber/60"
                          }`}
                        >
                          <span className={active ? "text-amber" : "text-cream-faint"}>{m.icon}</span>
                          <span className="flex-1">
                            <span className="block text-sm font-extrabold text-cream">{m.title}</span>
                            <span className="block text-xs text-cream-dim">{m.sub}</span>
                          </span>
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                              active ? "border-amber bg-amber" : "border-espresso-500"
                            }`}
                          >
                            {active && <span className="h-1.5 w-1.5 rounded-full bg-espresso-950" />}
                          </span>
                        </button>
                      );
                    })}

                    {form.method === "kartica" && (
                      <div className="animate-rise space-y-4 rounded-md border border-espresso-600 bg-espresso-850 p-4">
                        <Field label="Broj kartice" error={errors.kartica}>
                          <input
                            inputMode="numeric"
                            className={inputCls("kartica")}
                            value={form.kartica}
                            onChange={(e) => set("kartica", formatCard(e.target.value))}
                            placeholder="4242 4242 4242 4242"
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Ističe (MM/GG)" error={errors.expiry}>
                            <input
                              inputMode="numeric"
                              className={inputCls("expiry")}
                              value={form.expiry}
                              onChange={(e) => set("expiry", formatExpiry(e.target.value))}
                              placeholder="08/27"
                            />
                          </Field>
                          <Field label="CVC" error={errors.cvc}>
                            <input
                              inputMode="numeric"
                              className={inputCls("cvc")}
                              value={form.cvc}
                              onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                              placeholder="123"
                            />
                          </Field>
                        </div>
                        <p className="text-[11px] leading-relaxed text-cream-faint">
                          Ovo je simulacija — nijedan stvarni iznos se ne naplaćuje.
                        </p>
                      </div>
                    )}

                    <p className="flex items-center gap-2 pt-1 text-xs font-semibold text-cream-dim">
                      <IconTruck className="h-4 w-4 text-amber" />
                      {form.grad
                        ? `Procjena dostave za ${form.grad}: ${etaFor(form.grad)}`
                        : "Procjena dostave zavisi od izabranog grada."}
                    </p>
                  </div>

                  <aside className="h-fit rounded-md border border-espresso-700 bg-espresso-850 p-4">
                    <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cream-faint">
                      Tvoja narudžbina
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {items.map((it) => (
                        <li key={it.key} className="flex justify-between gap-3 text-xs">
                          <span className="text-cream-dim">
                            <strong className="font-bold text-cream">{it.qty}×</strong> {it.product.name}{" "}
                            <span className="text-cream-faint">({it.weight})</span>
                          </span>
                          <span className="shrink-0 font-bold text-cream">{fmt(it.lineTotal)}</span>
                        </li>
                      ))}
                    </ul>
                    <dl className="mt-4 space-y-1.5 border-t border-dashed border-espresso-600 pt-3 text-xs">
                      <div className="flex justify-between text-cream-dim">
                        <dt>Međuzbir</dt>
                        <dd>{fmt(subtotal)}</dd>
                      </div>
                      <div className="flex justify-between text-cream-dim">
                        <dt>Dostava</dt>
                        <dd className={shipping === 0 ? "font-bold text-sea" : ""}>
                          {shipping === 0 ? "Besplatno" : fmt(shipping)}
                        </dd>
                      </div>
                      <div className="flex justify-between pt-1">
                        <dt className="font-bold uppercase tracking-wider text-cream-faint">Ukupno</dt>
                        <dd className="font-display text-lg font-black text-amber">{fmt(total)}</dd>
                      </div>
                    </dl>
                  </aside>
                </div>
              )}

              <footer className="flex flex-col-reverse gap-3 border-t border-espresso-700 bg-espresso-850 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <button
                  onClick={step === 0 ? onClose : () => setStep(0)}
                  disabled={processing}
                  className="rounded-md px-5 py-3 text-sm font-bold uppercase tracking-wider text-cream-faint transition-colors hover:text-cream disabled:opacity-40"
                >
                  {step === 0 ? "Odustani" : "← Nazad"}
                </button>
                {step === 0 ? (
                  <button
                    onClick={next}
                    className="flex items-center justify-center gap-2.5 rounded-md bg-amber px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-espresso-950 transition-all hover:bg-amber-soft active:translate-y-px"
                  >
                    Nastavi na plaćanje
                    <IconArrow className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={confirm}
                    disabled={processing}
                    className="flex items-center justify-center gap-2.5 rounded-md bg-amber px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-espresso-950 transition-all hover:bg-amber-soft active:translate-y-px disabled:cursor-wait disabled:opacity-80"
                  >
                    {processing ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-espresso-950/30 border-t-espresso-950" />
                        Obrada…
                      </>
                    ) : (
                      <>Potvrdi narudžbinu — {fmt(total)}</>
                    )}
                  </button>
                )}
              </footer>
            </>
          ) : (
            <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
              <span className="relative grid h-24 w-24 animate-stamp place-items-center rounded-full border-[3px] border-sea text-sea">
                <span className="absolute inset-1.5 rounded-full border border-dashed border-sea/50" />
                <IconCheck className="h-10 w-10" />
              </span>
              <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.24em] text-sea">
                Narudžbina primljena
              </p>
              <h2 className="mt-2 font-display text-3xl font-black text-cream sm:text-4xl">
                Hvala{receipt ? `, ${receipt.ime}` : ""}! Kafa kreće.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                Potvrda stiže na <strong className="text-cream">{receipt?.email}</strong>. Broj
                narudžbine:{" "}
                <strong className="font-display text-amber">{receipt?.orderNo}</strong>
              </p>

              <dl className="mt-8 w-full max-w-sm space-y-2.5 rounded-md border border-espresso-700 bg-espresso-850 p-5 text-left text-sm">
                {[
                  { k: "Način plaćanja", v: receipt?.methodLabel ?? "" },
                  { k: "Dostava na", v: receipt?.grad ?? "" },
                  { k: "Procjena dostave", v: receipt?.eta ?? "" },
                ].map((r) => (
                  <div key={r.k} className="flex justify-between gap-4">
                    <dt className="text-cream-faint">{r.k}</dt>
                    <dd className="text-right font-bold text-cream">{r.v}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-dashed border-espresso-600 pt-2.5">
                  <dt className="font-bold uppercase tracking-wider text-cream-faint">Ukupno plaćeno</dt>
                  <dd className="font-display text-xl font-black text-amber">
                    {receipt ? fmt(receipt.total) : ""}
                  </dd>
                </div>
              </dl>

              <button
                onClick={onClose}
                className="mt-8 flex items-center gap-2.5 rounded-md bg-amber px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-espresso-950 transition-all hover:bg-amber-soft active:translate-y-px"
              >
                Nazad u radnju
                <IconArrow className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
