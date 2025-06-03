import { apiClient } from "./apiClient";

interface DeleteCartItemParams {
  params: {
    id: string;
  };
}

const deleteCartItem = async ({ params }: DeleteCartItemParams) => {
  const { id } = params;

  await apiClient.delete({
    endpoint: `/cart-items/${id}`,
  });
};

export default deleteCartItem;
