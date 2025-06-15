import { PatchProductParams } from "./type";
import { BASE_URL, TOKEN } from "../config";

const patchProduct = async ({
  productId,
  quantity,
}: PatchProductParams): Promise<void> => {
  const url = new URL(`${BASE_URL}/cart-items/${productId}`);

  const response = await fetch(url.toString(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
    body: JSON.stringify(quantity),
  });

  if (!response.ok) {
    throw new Error("상품 수량을 변경할 수 없습니다.");
  }
};

export default patchProduct;
