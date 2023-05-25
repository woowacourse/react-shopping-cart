import { useRecoilValue } from "recoil";
import { fetchedShoppingListAtom } from "../store/fetchState";
import { Cart } from "../types/product";

const useTargetShoppingSelector = (id: number): Cart | undefined => {
  const fetchedShoppingList = useRecoilValue(fetchedShoppingListAtom);
  return fetchedShoppingList.find(
    (shoppingProduct) => shoppingProduct.product.id === id
  );
};

export default useTargetShoppingSelector;
