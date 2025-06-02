import { baseAPI } from "./baseAPI";
import { APIResponse } from "./type";

export type CartResponse = APIResponse<CartContent>;

export interface Cart {
  id: string;
  quantity: number;
  product: Product;
}
export interface ProductContent {
  id: number;
  name: null | string;
  price: number;
  imageUrl: null | string;
  quantity: number;
  category: Category | null;
}

export interface CartContent {
  id: number;
  quantity: number;
  product: ProductContent;
}

export enum Category {
  식료품 = "식료품",
  패션잡화 = "패션잡화",
}

export type ProductCategoryType = "전체" | Category;
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: ProductCategoryType;
}

const convertResponseToProduct = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  category,
}: ProductContent): Product => ({
  id: id.toString(),
  name: name ?? "",
  price,
  imageUrl: imageUrl ?? "defaultImage",
  quantity: quantity ?? 0,
  category: (category ?? "전체") as ProductCategoryType,
});

export const convertResponseToCart = ({
  id,
  quantity,
  product,
}: CartContent): Cart => ({
  id: id.toString(),
  quantity,
  product: convertResponseToProduct(product),
});

export async function getShoppingCartData() {
  const params = new URLSearchParams();
  params.set("page", "0");
  params.set("size", "50");
  const basePath = `/cart-items?${params.toString()}`;

  const data = await baseAPI<CartResponse>({
    method: "GET",
    path: basePath,
  });

  const results = data?.content.map((cart) => convertResponseToCart(cart));

  return results ?? [];
}

export async function postCartItem(id: string) {
  return baseAPI({
    method: "POST",
    path: `/cart-items`,
    body: {
      productId: Number(id),
      quantity: 1,
    },
  });
}

export async function patchCartItem(cartId: string, quantity: number) {
  return baseAPI({
    method: "PATCH",
    path: `/cart-items/${cartId}`,
    body: {
      quantity,
    },
  });
}

export async function deleteCartItem(cartId: string) {
  await baseAPI({
    method: "DELETE",
    path: `/cart-items/${cartId}`,
  });
}
