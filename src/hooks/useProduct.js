import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../store/modules/product/productSlice";
import { getProductsAsync } from "../store/modules/product/productThunk";

export const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, errorMessage } = useSelector(
    (state) => state.product
  );

  const getProducts = () => {
    dispatch(getProductsAsync());
  };

  const getProduct = (id) => products[id];

  const resetProductError = () => {
    dispatch(resetError());
  };

  return {
    products,
    loading,
    errorMessage,
    getProducts,
    getProduct,
    resetProductError,
  };
};
