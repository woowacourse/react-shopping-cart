import { useSetRecoilState } from "recoil";
import { cartLocalInfosAtom } from "../store/cartProductsAtoms";
import { CartLocalInfo } from "../types";

const useCartProductsInfoUpdater = () => {
  const setCartInfo = useSetRecoilState(cartLocalInfosAtom);

  const updateCartInfo = ({ id, quantity, price }: CartLocalInfo) => {
    setCartInfo((prevCartQuantities) => {
      return prevCartQuantities.map((prevQuantity) => {
        if (prevQuantity.id === id) {
          return { id, quantity, price };
        }

        return prevQuantity;
      });
    });
  };

  return { updateCartInfo };
};

export { useCartProductsInfoUpdater };
