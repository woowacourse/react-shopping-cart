import { fetchData } from "./fetchData";
import { ProductId, IdQuantity } from "../types";
import { isResultResponse } from "../types/typeGuards";

const dataUploader = {
  addCartProduct: (json: ProductId) => {
    fetchData({
      url: "/cart-items",
      method: "POST",
      json: JSON.stringify(json),
      typeGuardFunction: isResultResponse,
    });
  },

  updateQuantity: ({ id, quantity }: IdQuantity) => {
    fetchData({
      url: `/cart-items/${id}`,
      method: "PATCH",
      json: JSON.stringify({ quantity }),
      typeGuardFunction: isResultResponse,
    });
  },

  removeCartProduct: (id: number) => {
    fetchData({
      url: `/cart-items/${id}`,
      method: "DELETE",
      typeGuardFunction: isResultResponse,
    });
  },
};

export default dataUploader;
