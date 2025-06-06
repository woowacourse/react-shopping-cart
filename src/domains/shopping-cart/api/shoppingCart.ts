import { apiClient } from "../../../api/apiClient";

type PageableType = {
  page: number;
  size: number;
  sort?: string;
};

const PAGEABLE_DEFAULT = {
  page: 0,
  size: 20,
  sort: "",
};

async function deleteShoppingCart(productId: string) {
  return apiClient.delete("cart-items", productId);
}

async function getShoppingCart(pageable: PageableType = PAGEABLE_DEFAULT) {
  const { page, size, sort } = pageable;

  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: sort ?? "",
  });

  return await apiClient.get("cart-items", params);
}

async function patchShoppingCart(productId: string, quantity: number) {
  return apiClient.patch("cart-items", productId, {
    id: productId,
    quantity,
  });
}

export { deleteShoppingCart, getShoppingCart, patchShoppingCart };
