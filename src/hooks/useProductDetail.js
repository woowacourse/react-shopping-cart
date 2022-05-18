import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductDetail } from "../store/actions";

export const useProductDetail = (productId) => {
  const dispatch = useDispatch();

  const {
    data: product,
    loading: isLoading,
    errorMessage,
  } = useSelector((state) => state.productDetailReducer);

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, []);

  return {
    product,
    isLoading,
    errorMessage,
  };
};
