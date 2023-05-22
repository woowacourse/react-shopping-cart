import { useSetRecoilState, useRecoilValue } from "recoil";
import { productsAtom, cartProductsAtom } from "../store/fetchAtoms";

type UseCartUpdater = {
  id: number;
};

const useCartUpdater = ({ id }: UseCartUpdater) => {
  const setCartProducts = useSetRecoilState(cartProductsAtom);
  const products = useRecoilValue(productsAtom);

  const searchProduct = () => {
    return products.find((product) => product.id === id);
  };

  const setQuantity = (quantity: number) => {
    setCartProducts((prevProducts) => {
      const isAlreadyExist = prevProducts.some((product) => product.id === id);

      if (isAlreadyExist) {
        return prevProducts.map((product) => {
          if (product.id === id) {
            return { ...product, quantity };
          }

          return product;
        });
      }

      const searchedProduct = searchProduct();

      if (searchedProduct) {
        const newCartProduct = {
          id: id,
          quantity: quantity,
          product: searchedProduct,
        };

        return [...prevProducts, newCartProduct];
      }

      return prevProducts;
    });
  };

  const removeProduct = (productId: number) => {
    setCartProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== productId);
    });
  };

  return { setQuantity, removeProduct };
};

export { useCartUpdater };
