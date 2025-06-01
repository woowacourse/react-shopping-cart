import { HttpMethod } from "../types/HttpMethod";
import { BASE_URL, TOKEN } from "./config";

type AddProductParams = {
  method: HttpMethod;
  params: {
    productId: number;
    quantity: number;
  };
};

const PatchProduct = async ({ method, params }: AddProductParams) => {
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

export default PatchProduct;
