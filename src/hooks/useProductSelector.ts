import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const findProductById = (state: RootState, targetId: number) => {
  return state.products.productList.find((product) => product.id === targetId);
};

const useProductsStateSelector = () => useSelector((state: RootState) => state.products);

const useTargetProductSelector = (id: number) =>
  useSelector((state: RootState) => findProductById(state, id));

export { useProductsStateSelector, useTargetProductSelector };
