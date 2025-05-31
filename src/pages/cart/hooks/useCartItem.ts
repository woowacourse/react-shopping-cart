import { getCartItems } from "@/apis/cartItems/getCartItems";
import useFetchData from "@/shared/hooks/useFetchData";

const useCartItem = () => {
  const {
    data: cartItems,
    refetch: refetchCartItems,
    isLoading,
    isFetching,
    errorMessage,
  } = useFetchData({ fetchFn: getCartItems });

  return {
    cartItems,
    refetchCartItems,
    isLoading,
    isFetching,
    errorMessage,
  };
};

export default useCartItem;
