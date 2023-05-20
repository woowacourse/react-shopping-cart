import useFetchData from './useFetchData.ts';

type UpdateCartItemsParams = {
  itemId: number;
  itemCount: number;
};

const useUpdateCartItems = () => {
  const { fetchData } = useFetchData();

  const updateCartItems = async ({ itemId, itemCount }: UpdateCartItemsParams) => {
    if (itemCount <= 0) {
      await fetchData(`/cart-items/${itemId}`, 'DELETE');
    }

    if (itemCount > 0) {
      await fetchData(`/cart-items/${itemId}`, 'PATCH', { quantity: itemCount });
    }
  };

  const addNewCartItem = async (productId: number) => {
    await fetchData('/cart-items', 'POST', { productId });
  };

  return { updateCartItems, addNewCartItem };
};

export default useUpdateCartItems;
