import { useRecoilValue, useSetRecoilState } from "recoil";
import { fetchProductsSelector } from "../store/fetchAtoms";
import { cartLocalInfosAtom } from "../store/cartProductsAtoms";
import { IdQuantity } from "../types";

const useCartQuantityUpdater = () => {
  const products = useRecoilValue(fetchProductsSelector);
  const setCartInfos = useSetRecoilState(cartLocalInfosAtom);

  const getPriceById = (id: number) => {
    const searchedProduct = products.find((product) => product.id === id);

    if (!searchedProduct) {
      alert("상품을 찾지 못했습니다. 사이트를 새로고침 해 주세요.");
      throw Error();
    }

    return searchedProduct.price;
  };

  const updateCartQuantity = ({ id, quantity }: IdQuantity) => {
    const price = getPriceById(id);

    setCartInfos((prevCartInfos) => {
      if (prevCartInfos.every((prevCartInfo) => prevCartInfo.id !== id)) {
        return [...prevCartInfos, { id, quantity, price: price }];
      }

      return [...prevCartInfos].map((prevCartInfo) => {
        if (prevCartInfo.id === id) {
          return { id, quantity, price };
        }

        return prevCartInfo;
      });
    });
  };

  return { updateCartQuantity };
};

export { useCartQuantityUpdater };
