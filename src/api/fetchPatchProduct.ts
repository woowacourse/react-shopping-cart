import { HttpMethod } from "../types/HttpMethod";

type fetchAddProductParams = {
  method: HttpMethod;
  params: {
    productId: number;
    quantity: number;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchPatchProduct = async ({ method, params }: fetchAddProductParams) => {
  const url = new URL(BASE_URL + "/" + params.productId);

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
    body: JSON.stringify(params.quantity),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("상품 수량을 변경할 수 없습니다.");
  }
};

export default fetchPatchProduct;
