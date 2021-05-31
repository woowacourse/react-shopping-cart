import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/modules/productSlice";

// eslint-disable-next-line import/prefer-default-export
export const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (products.length !== 0) return;
    dispatch(getProducts());
  }, [dispatch, products.length]);

  const getProduct = (id) => products[id];

  return { products, getProduct, loading, errorMessage };
};
