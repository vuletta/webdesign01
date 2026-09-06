import type { Product, ResolvedCartItem, Weight } from "../types";

export const fmt = (n: number): string => `${n.toFixed(2).replace(".", ",")} €`;

export const unitPrice = (p: Product, w: Weight): number =>
  w === "250g" ? p.price250 : p.price1kg;

export const FREE_SHIPPING_THRESHOLD = 35;
export const SHIPPING_FEE = 3.5;

export const resolveCart = (
  items: { productId: string; weight: Weight; qty: number; key: string }[],
  products: Product[]
): ResolvedCartItem[] =>
  items.flatMap((it) => {
    const product = products.find((p) => p.id === it.productId);
    if (!product) return [];
    const unit = unitPrice(product, it.weight);
    return [{ ...it, product, unitPrice: unit, lineTotal: unit * it.qty }];
  });

export const genOrderNo = (): string =>
  `GK-${Math.floor(1000 + Math.random() * 9000)}`;
