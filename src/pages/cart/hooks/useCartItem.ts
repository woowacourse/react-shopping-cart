import { getCartItems } from "@/apis/cartItems/getCartItems";
import useFetchData from "@/shared/hooks/useFetchData";

const useCartItem = () => {
  const {
    data: cartItems,
    isLoading,
    errorMessage,
    refetch: refetchCartItems,
  } = useFetchData({ fetchFn: getCartItems });

  return {
    cartItems,
    isLoading,
    errorMessage,
    refetchCartItems,
  };
};

export default useCartItem;
