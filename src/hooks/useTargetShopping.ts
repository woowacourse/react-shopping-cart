import { useRecoilValue } from "recoil";
import { Cart } from "../types/product";
import { fetchedShoppingListAtom } from "../store/cartState";

const useTargetShoppingSelector = (id: number): Cart | undefined => {
  const fetchedShoppingList = useRecoilValue(fetchedShoppingListAtom);
  return fetchedShoppingList.find(
    (shoppingProduct) => shoppingProduct.product.id === id
  );
};

export default useTargetShoppingSelector;
