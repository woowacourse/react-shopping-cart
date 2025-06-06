import { apiDelete } from "./apiRequest";

interface DeleteCartItemParams {
  params: {
    id: string;
  };
}

const deleteCartItem = async ({ params }: DeleteCartItemParams) => {
  const { id } = params;
  return apiDelete(`/cart-items/${id}`);
};

export default deleteCartItem;
