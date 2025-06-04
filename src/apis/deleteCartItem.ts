import { apiClient } from "./apiClient";

const deleteCartItem = async (id: number) => {
  await apiClient.delete({
    endpoint: `/cart-items/${id}`,
  });
};

export default deleteCartItem;
