import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

import { Order } from "../types";

const BASE_URL = "https://shopping-cart.techcourse.co.kr";

const config = {
  baseURL: BASE_URL,
};

type Fetch = typeof fetch;
type FetchParams = Parameters<Fetch>;

type Api = Fetch;
type ApiParams = FetchParams;

type Config = typeof config;

const isJsonResponseData = (response: Response) => {
  const contentType = response.headers.get("content-type") || "";

  return contentType.includes("application/json");
};

const intercept = (api: Api, config?: Config) => async (input: ApiParams[0], init?: ApiParams[1]): ReturnType<Api> => {
  if (init) {
    if (typeof init.body === "string") {
      init.body = JSON.stringify(snakecaseKeys(JSON.parse(init.body)));
    }

    init.headers = {
      "Content-Type": "application/json",
    };
  }

  const response = await api((config?.baseURL || "") + input, init);

  if (!response.ok) {
    throw Error((await response.json()).message);
  }

  if (isJsonResponseData(response)) {
    return camelcaseKeys(await response.json());
  }

  return response;
};

const request = intercept(fetch, config);

const api = {
  products: {
    get: (id: string = "") => {
      return request(`/api/products/${id}`);
    },
  },
  cart: {
    get: () => {
      return request(`/api/customers/seojihwan/carts`);
    },
    post: (productId: string) => {
      return request(`/api/customers/seojihwan/carts`, {
        method: "POST",
        body: JSON.stringify({ productId }),
      });
    },
    delete: (cartId: string) => {
      return request(`/api/customers/seojihwan/carts/${cartId}`, {
        method: "DELETE",
      });
    },
  },
  orderList: {
    get: () => {
      return request(`/api/customers/seojihwan/orders`);
    },
    item: {
      get: (orderId: string = "") => {
        return request(`/api/customers/seojihwan/orders/${orderId}`);
      },
      post: (order: Order) => {
        return request(`/api/customers/seojihwan/orders`, {
          method: "POST",
          body: JSON.stringify(order),
        });
      },
    },
  },
};

export default api;
