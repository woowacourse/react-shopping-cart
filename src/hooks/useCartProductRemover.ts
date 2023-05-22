import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartIsCheckedAtom, hideListAtom } from "../store/cartProductsAtoms";
import dataUploader from "../domains/dataUploader";

const useCartProductRemover = () => {
  const isChecked = useRecoilValue(cartIsCheckedAtom);
  const setHideList = useSetRecoilState(hideListAtom);

  const removeCartProduct = (id: number) => {
    setHideList((prevHideList) => {
      if (!prevHideList[id]) {
        dataUploader.removeCartProduct(id);
        return { ...prevHideList, [id]: true };
      }

      return prevHideList;
    });
  };

  const removeCheckedCartProducts = () => {
    setHideList((prevHideList) => {
      const newHideList = { ...prevHideList };

      Object.entries(isChecked).forEach(([key, value]) => {
        if (value) {
          dataUploader.removeCartProduct(Number(key));
          newHideList[key] = true;
        }
      });

      return newHideList;
    });
  };

  return { removeCartProduct, removeCheckedCartProducts };
};

export { useCartProductRemover };
