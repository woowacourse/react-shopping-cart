import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { getProductsByPage } from "../../modules/products";
import { ProductListAction, Products } from "../../modules/products/type";
import { useAppDispatch } from "./useAppDispatch";

const useProductList = () => {
  const productList = useSelector<RootState, Products>(
    (state) => state.products
  );

  const dispatch = useAppDispatch<ProductListAction>();

  return {
    ...productList,
    getProductsByPage: () => {
      dispatch(getProductsByPage());
    },
  };
};

export default useProductList;
