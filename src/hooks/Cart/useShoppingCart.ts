import fetchCartItems from "@/apis/fetchCartItems";
import { CartItem } from "@/type/CartItem";
import { useFetch } from "../useFetch";
import useHandleCartItemQuantity from "./useHandleCartItemQuantity";
import useHandleDeleteCartItem from "./useHandleDeleteCartItem";

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

  return {
    cartItemsData: cartItemsData || [],
    cartItemsFetchError,
    cartFetchLoading,
    refetchCartItems,
    handleCartItemQuantity,
    handleDeleteCartItem,
  };
}

export default useShoppingCart;
