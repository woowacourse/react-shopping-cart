import { useEffect, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fetchCartProductsSelector } from "../store/fetchAtoms";
import {
  cartLocalInfosAtom,
  cartProductsCountSelector,
  totalPriceSelector,
  cartIsCheckedAtom,
} from "../store/cartProductsAtoms";

const useCartInfosSyncer = () => {
  const cartProducts = useRecoilValue(fetchCartProductsSelector);
  const setCartInfos = useSetRecoilState(cartLocalInfosAtom);
  const cartProductsCount = useRecoilValue(cartProductsCountSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const setCartIsChecked = useSetRecoilState(cartIsCheckedAtom);

  const convertToCartInfo = useCallback(() => {
    setCartInfos(() =>
      cartProducts.map(({ id, quantity, product }) => ({
        id,
        quantity,
        price: product.price,
      }))
    );
  }, [cartProducts, setCartInfos]);

  const initializeCartIsChecked = useCallback(() => {
    setCartIsChecked((prevCartIsChecked) => {
      const newCartIsChecked = { ...prevCartIsChecked };

      cartProducts.forEach(({ id }) => {
        if (!newCartIsChecked.hasOwnProperty(id)) {
          newCartIsChecked[id] = false;
        }
      });

      return newCartIsChecked;
    });
  }, [cartProducts, setCartIsChecked]);

  useEffect(() => {
    convertToCartInfo();
  }, [convertToCartInfo]);

  useEffect(() => {
    initializeCartIsChecked();
  }, [initializeCartIsChecked]);

  return { cartProductsCount, totalPrice };
};

export { useCartInfosSyncer };
