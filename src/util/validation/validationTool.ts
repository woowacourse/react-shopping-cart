import { CartItem } from "@/type/CartItem";
import { Product, ProductWithQuantity } from "@/type/Product";

type UnknownRec = Record<string, unknown>;
const isObj = (v: unknown): v is UnknownRec =>
  typeof v === "object" && v !== null;

export const isProduct = (u: unknown): u is Product => {
  if (!isObj(u)) return false;
  const o = u;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.price === "number" &&
    typeof o.imageUrl === "string" &&
    typeof o.category === "string"
  );
};

export const isProductWithQuantity = (u: unknown): u is ProductWithQuantity =>
  isProduct(u) && typeof (u as ProductWithQuantity).quantity === "number";

export const isCartItem = (u: unknown): u is CartItem => {
  if (!isObj(u)) return false;
  return (
    typeof u.id === "string" &&
    typeof u.quantity === "number" &&
    isProductWithQuantity(u.product)
  );
};
