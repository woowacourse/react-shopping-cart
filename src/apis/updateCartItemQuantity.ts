import { apiClient } from "./apiClient";

interface updateCartItemsParams {
  params: {
    id: string;
    quantity: string;
  };
}

const updateCartItemQuantity = async ({ params }: updateCartItemsParams) => {
  const { id, quantity } = params;

  await apiClient.patch({
    endpoint: `/cart-items/${id}`,
    searchParams: { quantity },
  });
};

export default updateCartItemQuantity;
