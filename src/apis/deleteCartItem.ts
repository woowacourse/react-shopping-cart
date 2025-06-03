import { apiClient } from "./apiClient";

const deleteCartItem = async (id: string) => {
  await apiClient.delete({
    endpoint: `/cart-items/${id}`,
  });
};

export default deleteCartItem;
