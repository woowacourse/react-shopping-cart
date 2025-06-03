import { useState } from "react";
import { CartItem } from "../types/type";
import cartItemsApi from "../apis/cartItems";

export type LoadingStatus = "loading" | "fetching" | "success" | "error";

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLoadingStatus = (status: LoadingStatus) => {
    setLoadingStatus(status);
  };

  const fetchCartItems = async () => {
    setLoadingStatus("fetching");
    try {
      const data = await cartItemsApi.get();
      setCartItems(data);
      setErrorMessage("");
      setLoadingStatus("success");
    } catch (e) {
      setErrorMessage("Fail to Fetch Error");
      setLoadingStatus("error");
    }
  };

  const deleteCartItem = async (id: number) => {
    setLoadingStatus("fetching");
    try {
      await cartItemsApi.delete(id);
      await fetchCartItems();
      setErrorMessage("");
      setLoadingStatus("success");
    } catch (e) {
      setErrorMessage("Fail to Delete Error");
      setLoadingStatus("error");
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    setLoadingStatus("fetching");
    try {
      await cartItemsApi.patch(id, quantity);
      await fetchCartItems();
      setErrorMessage("");
      setLoadingStatus("success");
    } catch (e) {
      setErrorMessage("Fail to Update Error");
      setLoadingStatus("error");
    }
  };

  return {
    cartItems,
    fetchCartItems,
    deleteCartItem,
    updateCartItem,
    loadingStatus,
    errorMessage,
    handleLoadingStatus,
  };
};
