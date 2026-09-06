import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CartItem, Product, ToastMsg, Weight } from "./types";
import { PRODUCTS } from "./data/products";
import { FREE_SHIPPING_THRESHOLD, resolveCart, SHIPPING_FEE } from "./lib/utils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { CoastBand, Story } from "./components/Bands";
import Shop, { type CatFilter, type SortKey } from "./components/Shop";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import { IconBean } from "./components/Icons";

const STORAGE_KEY = "gorica.korpa";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CatFilter>("sve");
  const [sort, setSort] = useState<SortKey>("featured");
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* ignorisano */
    }
  }, [cart]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || detail !== null || checkout ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, detail, checkout]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (checkout) setCheckout(false);
      else if (detail) setDetail(null);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [checkout, detail, cartOpen]);

  const pushToast = useCallback((text: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, text }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const addToCart = useCallback(
    (p: Product, weight: Weight, qty: number) => {
      const key = `${p.id}-${weight}`;
      setCart((prev) => {
        const existing = prev.find((i) => i.key === key);
        return existing
          ? prev.map((i) =>
              i.key === key ? { ...i, qty: Math.min(20, i.qty + qty) } : i
            )
          : [...prev, { key, productId: p.id, weight, qty }];
      });
      pushToast(`„${p.name}“ (${weight}) je u korpi.`);
    },
    [pushToast]
  );

  const quickAdd = useCallback(
    (p: Product) => addToCart(p, "250g", 1),
    [addToCart]
  );

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.key !== key) return [i];
        const q = i.qty + delta;
        return q <= 0 ? [] : [{ ...i, qty: Math.min(20, q) }];
      })
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const resolved = useMemo(() => resolveCart(cart, PRODUCTS), [cart]);
  const subtotal = useMemo(
    () => resolved.reduce((s, i) => s + i.lineTotal, 0),
    [resolved]
  );
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const cartCount = resolved.reduce((s, i) => s + i.qty, 0);

  const handleDetailAdd = useCallback(
    (p: Product, w: Weight, q: number) => {
      addToCart(p, w, q);
      setDetail(null);
      setCartOpen(true);
    },
    [addToCart]
  );

  const openCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckout(true);
  }, []);

  const completeOrder = useCallback(() => {
    setCart([]);
    pushToast("Narudžbina je primljena. Hvala!");
  }, [pushToast]);

  return (
    <div className="min-h-screen">
      <div aria-hidden="true" className="noise-layer pointer-events-none fixed inset-0 z-[95] opacity-[0.07]" />

      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Story />
        <Shop
          query={query}
          setQuery={setQuery}
          cat={cat}
          setCat={setCat}
          sort={sort}
          setSort={setSort}
          onOpen={setDetail}
          onQuickAdd={quickAdd}
        />
        <CoastBand />
      </main>

      <Footer onToast={pushToast} />

      {detail && (
        <ProductModal
          key={detail.id}
          product={detail}
          onClose={() => setDetail(null)}
          onAdd={handleDetailAdd}
        />
      )}

      <CartDrawer
        open={cartOpen}
        items={resolved}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={openCheckout}
      />

      {checkout && (
        <CheckoutModal
          items={resolved}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onClose={() => setCheckout(false)}
          onComplete={completeOrder}
        />
      )}

      <div className="pointer-events-none fixed bottom-5 left-5 z-[99] flex flex-col gap-2.5">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex animate-rise items-center gap-2.5 rounded-md border border-espresso-600 bg-espresso-800 px-4 py-3 text-sm font-semibold text-cream shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
          >
            <IconBean className="h-4 w-4 shrink-0 text-amber" />
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
