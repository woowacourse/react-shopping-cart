import { HttpMethod } from "../types/HttpMethod";
import { BASE_URL, TOKEN } from "./config";

type fetchRemoveProductParams = {
  method: HttpMethod;
  params: {
    productId: number;
  };
};

const fetchRemoveProduct = async ({
  method,
  params,
}: fetchRemoveProductParams) => {
  const url = new URL(`${BASE_URL}/${params.productId}`);

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

export default fetchRemoveProduct;
