import { useSelector } from "react-redux";
import { RootState } from "../modules";
import { getProductsByPage } from "../modules/products";
import { ProductListAction } from "../modules/products/type";
import { useAppDispatch } from "./useAppDispatch";

const useProductList = () => {
  const productList = useSelector((state: RootState) => state.products);

  const dispatch = useAppDispatch<ProductListAction>();

  return {
    ...productList,
    getProductsByPage: () => {
      dispatch(getProductsByPage());
    },
  };
};

export default useProductList;
