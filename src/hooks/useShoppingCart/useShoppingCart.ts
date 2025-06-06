import { CartItem } from "../../type/CartItem"
import { useCartItemsContext } from "../../contexts/CartItemsProvider"
import fetchCartItems from "../../apis/fetchCartItems"
import useHandleCartItemQuantity from "./useHandleCartItemQuantity"
import useHandleDeleteCartItem from "./useHandleDeleteCartItem"

const getCartItems = async () => {
  const { content } = await fetchCartItems({
    params: { page: "0", size: "20" },
  })
  return content
}

function useShoppingCart() {
  const {
    data: cartItemsData,
    error: cartItemsFetchError,
    loading: cartFetchLoading,
    refetch: refetchCartItems,
  } = useCartItemsContext<CartItem[]>({
    fetcher: getCartItems,
  })

  const { isLoading: isQuantityUpdateLoading, handleCartItemQuantity } =
    useHandleCartItemQuantity(refetchCartItems)

  const { isLoading: isDeleteItemLoading, handleDeleteCartItem } =
    useHandleDeleteCartItem(refetchCartItems)

  return {
    cartItemsData,
    cartItemsFetchError,
    cartFetchLoading,
    refetchCartItems,
    isQuantityUpdateLoading,
    handleCartItemQuantity,
    isDeleteItemLoading,
    handleDeleteCartItem,
  }
}

export default useShoppingCart
