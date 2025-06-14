import { useCartItemsContext } from "../../../contexts/CartItemsProvider";
import useHandleCartItemQuantity from "./useHandleCartItemQuantity";
import useHandleDeleteCartItem from "./useHandleDeleteCartItem";

function useShoppingCart() {
  const {
    data: cartItemsData,
    error: cartItemsFetchError,
    isLoading: isCartItemsLoading,
    isFetching: isCartItemsFetching,
    refetch: refetchCartItems,
  } = useCartItemsContext();

  const { isLoading: isQuantityUpdateLoading, handleCartItemQuantity } =
    useHandleCartItemQuantity(refetchCartItems);

  const { isLoading: isDeleteItemLoading, handleDeleteCartItem } =
    useHandleDeleteCartItem(refetchCartItems);

  return {
    cartItemsData,
    cartItemsFetchError,
    isCartItemsLoading,
    isCartItemsFetching,
    refetchCartItems,
    isQuantityUpdateLoading,
    handleCartItemQuantity,
    isDeleteItemLoading,
    handleDeleteCartItem,
  };
}

export default useShoppingCart;
