import { DeleteProductParams } from "./type";
import { BASE_URL, TOKEN } from "../config";

const deleteProduct = async ({
  productId,
}: DeleteProductParams): Promise<void> => {
  const url = new URL(`${BASE_URL}/cart-items/${productId}`);

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("장바구니에서 상품을 빼는데 실패했습니다.");
  }
};

export default deleteProduct;
