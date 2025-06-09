import { HttpMethod } from "../types/HttpMethod";
import { BASE_URL, TOKEN } from "./config";

type RemoveProductParams = {
  method: HttpMethod;
  params: {
    productId: number;
  };
};

const RemoveProduct = async ({ method, params }: RemoveProductParams) => {
  const url = new URL(BASE_URL + "/cart-items/" + params.productId);

  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("장바구니에서 상품을 빼는데 실패했습니다.");
  }
};

export default RemoveProduct;
