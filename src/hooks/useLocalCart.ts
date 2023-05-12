import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { cartAllSelector } from "../recoil/cartState";

const useLocalCart = () => {
  const cart = useRecoilValue(cartAllSelector);

  console.log(cart);
  useEffect(() => {
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
