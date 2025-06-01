import { createContext, useState } from "react";
import { CartItem } from "../types/type";
import cartItemsApi from "../apis/cartItems";
import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../constants";

type LoadingStatus = "loading" | "fetching" | "success" | "error";

interface CartItemContext {
  cartItems: CartItem[];
  loadingStatus: LoadingStatus;
  errorMessage: string;
  fetchCartItems: () => Promise<void>;
  deleteCartItem: (cartItemId: number) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
  selectedItemIds: Set<number>;
  toggleSelectedItemId: (id: number) => void;
  replaceSelectedItemIds: (ids: number[]) => void;
  handleLoadingStatus: (status: LoadingStatus) => void;
}

interface CartItemProviderProps {
  children: React.ReactNode;
}

export const CartItemContext = createContext<CartItemContext | null>(null);

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    new Set()
  );

  const toggleSelectedItemId = (id: number) => {
    const newSet = new Set(selectedItemIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedItemIds(newSet);
  };

  const replaceSelectedItemIds = (ids: number[]) => {
    setSelectedItemIds(new Set(ids));
  };

  const handleLoadingStatus = (status: LoadingStatus) => {
    setLoadingStatus(status);
  };

  async function fetchCartItems() {
    try {
      setLoadingStatus("fetching");
      const data = await cartItemsApi.get();
      setCartItems(data);
      setLoadingStatus("success");
      setErrorMessage("");
    } catch (error) {
      setLoadingStatus("error");
      setErrorMessage("Fail to Fetch Error");
    }
  }

  async function deleteCartItem(cartItemId: number) {
    try {
      setLoadingStatus("fetching");
      await cartItemsApi.delete(cartItemId);
      await fetchCartItems();
      setLoadingStatus("success");
      setErrorMessage("");
    } catch (error) {
      setLoadingStatus("error");
      setErrorMessage("Fail to Delete Error");
    }
  }

  async function updateCartItem(cartItemId: number, quantity: number) {
    try {
      setLoadingStatus("fetching");
      await cartItemsApi.patch(cartItemId, quantity);
      await fetchCartItems();
      setLoadingStatus("success");
      setErrorMessage("");
    } catch (error) {
      setLoadingStatus("error");
      setErrorMessage("Fail to Update Error");
    }
  }

  const orderPrice = cartItems.reduce((acc, cartItem) => {
    if (selectedItemIds.has(cartItem.id)) {
      return acc + cartItem.product.price * cartItem.quantity;
    }
    return acc;
  }, 0);

  const shippingFee = orderPrice >= FREE_SHIPPING_MIN_AMOUNT ? 0 : SHIPPING_FEE;

  const totalPrice = shippingFee + orderPrice;

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        loadingStatus,
        errorMessage,
        fetchCartItems,
        deleteCartItem,
        updateCartItem,
        orderPrice,
        shippingFee,
        totalPrice,
        selectedItemIds,
        toggleSelectedItemId,
        replaceSelectedItemIds,
        handleLoadingStatus,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
