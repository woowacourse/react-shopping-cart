import cartApi from "../apis/cartApi";
import { useEffect, useState } from "react";
import { Content } from "../types/cartItem";
import { useError } from "../contexts/ErrorContext";

interface CartItemsType extends Content {
  isChecked: boolean;
}

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
    cartItems: CartItemsType[];
    handleCartItemChange: HandleCartItemChangeType;
    handleCheckChange: HandleCheckChangeType;
    isAllChecked: boolean;
  };
  orderResult: Record<"cartItemsTotalQuantity" | "cartItemsCheckedCount" | "totalPrice", number>;
}

const useCart = (): UseCartReturnType => {
  const { showError } = useError();
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);
  const cartItemsCount = cartItems.length;
  const cartItemsCheckedCount = cartItems.filter((item) => item.isChecked).length;
  const cartItemsTotalQuantity = cartItems.reduce((acc, item) => {
    if (item.isChecked) acc += item.quantity;
    return acc;
  }, 0);
  const isAllChecked = cartItems.every((item) => item.isChecked);
  const orderPrice = cartItems.reduce((acc, item) => {
    if (item.isChecked) acc += item.quantity * item.product.price;
    return acc;
  }, 0);
  const deliveryPrice = orderPrice < 100000 && orderPrice > 0 ? 3000 : 0;
  const totalPrice = orderPrice + deliveryPrice;

  const getInitializeCartItems = async () => {
    try {
      const data = await cartApi.get({ page: 0, size: 20 });
      const mappedCartItems = data.content.map((item) => ({ ...item, isChecked: true }));
      setCartItems(mappedCartItems);
    } catch (e) {
      if (e instanceof Error) console.error(e);
    }
  };

  const getCartItems = async () => {
    try {
      const data = await cartApi.get({ page: 0, size: 20 });
      const mappedCartItems = data.content.map((item) => {
        const prevItemChecked = cartItems.find((prevItem) => prevItem.id === item.id)!.isChecked;
        return { ...item, isChecked: prevItemChecked ?? true };
      });
      setCartItems(mappedCartItems);
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    }
  };

  const patchCartItem = async ({ id, quantity }: { id: number; quantity: number }) => {
    try {
      await cartApi.patch({ id, quantity });
      getCartItems();
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    }
  };

  const deleteCartItem = async ({ id }: { id: number }) => {
    try {
      await cartApi.delete({ id });
      getCartItems();
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    }
  };

  const handleCartItemChange: HandleCartItemChangeType = ({ action, id, quantity }) => {
    if (action === "patch") patchCartItem({ id, quantity: quantity! });
    if (action === "delete") deleteCartItem({ id });
  };

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") {
      const mappedCartItems = cartItems.map((item) => ({ ...item, isChecked: !isAllChecked }));
      setCartItems(mappedCartItems);
    }

    if (action === "each") {
      const mappedCartItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, isChecked: !item.isChecked };
        }

        return item;
      });
      setCartItems(mappedCartItems);
    }
  };

  useEffect(() => {
    getInitializeCartItems();
  }, []);

  return {
    cartItemsInfo: { orderPrice, deliveryPrice, totalPrice, cartItemsCount, cartItemsCheckedCount },
    cartItemListProps: { cartItems, handleCartItemChange, handleCheckChange, isAllChecked },
    orderResult: { cartItemsTotalQuantity, cartItemsCheckedCount, totalPrice },
  };
};

export default useCart;
