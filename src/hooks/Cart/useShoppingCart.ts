import fetchCartItems from "@/apis/fetchCartItems";
import { CartItem } from "@/type/CartItem";
import { useFetch } from "../useFetch";
import useHandleCartItemQuantity from "./useHandleCartItemQuantity";
import useHandleDeleteCartItem from "./useHandleDeleteCartItem";
import useHandleOrderCartItem from "./useHandleOrderCartItem";

const getCartItems = async () => {
  const { content } = (await fetchCartItems({
    params: { page: "0", size: "20" },
  })) as { content: CartItem[] };
  return content;
};

function useShoppingCart() {
  const {
    data: cartItemsData,
    error: cartItemsFetchError,
    loading: cartFetchLoading,
    refetch: refetchCartItems,
  } = useFetch<CartItem[]>(getCartItems);

  const { handleCartItemQuantity } =
    useHandleCartItemQuantity(refetchCartItems);

  const { handleDeleteCartItem } = useHandleDeleteCartItem(refetchCartItems);
  const { handleOrderCartItem } = useHandleOrderCartItem(refetchCartItems);

  return {
    cartItemsData: cartItemsData || [],
    cartItemsFetchError,
    cartFetchLoading,
    refetchCartItems,
    handleCartItemQuantity,
    handleDeleteCartItem,
    handleOrderCartItem,
  };
}

export default useShoppingCart;
