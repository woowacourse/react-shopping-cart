import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductList } from "../store/actions";

export const useProductList = () => {
  const dispatch = useDispatch();

  const {
    data: productList,
    loading: isLoading,
    errorMessage,
  } = useSelector((state) => state.productListReducer);

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  return {
    productList,
    isLoading,
    errorMessage,
  };
};
