import { API_TOKEN } from "./store/utils";

enum MethodType {
  Get = "GET",
  Post = "POST",
  Delete = "DELETE",
  Patch = "PATCH",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchWrapper = (input: string | URL | Request, init?: RequestInit | undefined) => any;

const fetchWrapper: FetchWrapper = async (url, init) => {
  try {
    const response = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    });
    if (response.ok && init?.method === MethodType.Get) {
      const data = await response.json();
      return data;
    }
    if (!response.ok) {
      const message = `Fetch error. status: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
};

export const fetchProducts = async () => {
  const url = import.meta.env.VITE_API_BASE_URL + "/cart-items";
  const init = {
    method: MethodType.Get,
  };
  const products = await fetchWrapper(url, init);
  return products;
};

export const deleteProduct = async (cartId: number) => {
  const url = import.meta.env.VITE_API_BASE_URL + `/cart-items/${cartId}`;
  const init = {
    method: MethodType.Delete,
  };
  await fetchWrapper(url, init);
};

interface ChangeProductAmountProps {
  quantity: number;
  id: number;
}

export const changeProductAmount = async ({ quantity, id }: ChangeProductAmountProps) => {
  const url = import.meta.env.VITE_API_BASE_URL + `/cart-items/${id}`;
  const init = {
    method: MethodType.Patch,
    body: JSON.stringify({
      quantity,
    }),
  };
  await fetchWrapper(url, init);
};

export const fetchCartItemsCounts = async () => {
  const url = import.meta.env.VITE_API_BASE_URL + "/cart-items/counts";
  const init = {
    method: MethodType.Get,
  };
  const { quantity } = await fetchWrapper(url, init);
  return quantity;
};

export const AddItem = async ({ productId }: { productId: number }) => {
  const url = import.meta.env.VITE_API_BASE_URL + "/cart-items";
  const init = {
    method: MethodType.Post,
    body: JSON.stringify({
      productId,
    }),
  };
  await fetchWrapper(url, init);
};

export const fetchCoupons = async () => {
  const url = import.meta.env.VITE_API_BASE_URL + "/coupons";
  const init = {
    method: MethodType.Get,
  };
  const coupons = await fetchWrapper(url, init);
  return coupons;
};

export const placeOrders = async () => {
  const url = import.meta.env.VITE_API_BASE_URL + "/orders";
  const init = {
    method: MethodType.Post,
  };
  await fetchWrapper(url, init);
};
