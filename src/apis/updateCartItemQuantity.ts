import { apiPatch } from "../util/apiRequest";

interface updateCartItemsParams {
  params: {
    id: string;
    quantity: number;
  };
}

const updateCartItemQuantity = async ({ params }: updateCartItemsParams) => {
  const { id, quantity } = params;
  return apiPatch(`/cart-items/${id}`, { quantity });
};

export default updateCartItemQuantity;
