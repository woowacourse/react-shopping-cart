import { useEffect, useState } from "react";
import cartItemsApi from "../apis/cartItems";

export const useFetchCartItems = (
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await cartItemsApi.get();
        setCartItems(data);
        setFetchError("");
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setFetchError("장바구니 아이템을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setCartItems]);

  return { isLoading, fetchError };
};
