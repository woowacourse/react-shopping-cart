import { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { cartAllSelector } from "../store/cartState";

const useLocalCart = () => {
  const cart = useRecoilValue(cartAllSelector);

  useLayoutEffect(() => {
    const handleLocalStorage = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };

    window.addEventListener("beforeunload", handleLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", handleLocalStorage);
    };
  }, [cart]);
};

export default useLocalCart;
