import useCartCheck from "./useCartCheck";
import useCartResource from "./useCartResource";
import { CartItem } from "../../../shared/types/cartItem";
import calculateCartAmount from "../utils/calculateCartAmount";
import calculateCartPrice from "../utils/calculateCartPrice";

type HandleCartItemChangeType = ({
  action,
  id,
  quantity,
}: {
  action: "patch" | "delete";
  id: number;
  quantity?: number;
}) => void;

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

export interface UseCartReturnType {
  cartItemsInfo: Record<
    "cartItemsCount" | "orderPrice" | "deliveryPrice" | "totalPrice" | "cartItemsCheckedCount",
    number
  >;
  cartItemListProps: {
    cartItems: CartItem[];
    checkedIds: number[];
    handleCartItemChange: HandleCartItemChangeType;
    handleCheckChange: HandleCheckChangeType;
    isAllChecked: boolean;
  };
  orderConfirmPageData: {
    cartItems: CartItem[];
    cartItemsTotalQuantity: number;
    cartItemsCheckedCount: number;
    orderPrice: number;
    deliveryPrice: number;
    totalPrice: number;
  };
}

const useCart = (): UseCartReturnType => {
  const { cartItems, cartItemIds, handleCartItemChange } = useCartResource();
  const { checkedIds, isAllChecked, handleCheckChange } = useCartCheck(cartItemIds);

  const { cartItemsCount, cartItemsCheckedCount, cartItemsTotalQuantity } = calculateCartAmount(cartItems, checkedIds);
  const { orderPrice, deliveryPrice, totalPrice } = calculateCartPrice(cartItems, checkedIds);

  return {
    cartItemsInfo: { orderPrice, deliveryPrice, totalPrice, cartItemsCount, cartItemsCheckedCount },
    cartItemListProps: { cartItems, checkedIds, handleCartItemChange, handleCheckChange, isAllChecked },
    orderConfirmPageData: {
      cartItems,
      orderPrice,
      deliveryPrice,
      totalPrice,
      cartItemsTotalQuantity,
      cartItemsCheckedCount,
    },
  };
};

export default useCart;
