import { useDispatch, useSelector } from "react-redux";
import { getProductsByPage } from "../modules/products";

const useProductList = () => {
  const productList = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return {
    isLoading: productList.isLoading,
    data: productList.data,
    isEnd: productList.isEnd,
    getProductsByPage: () => {
      dispatch(getProductsByPage());
    },
  };
};

export default useProductList;
