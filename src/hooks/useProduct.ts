import { useSelector } from "react-redux";
import { getProductById } from "../modules/product";
import { RootState } from "../modules";
import { ProductAction } from "../modules/product/type";
import { useAppDispatch } from "./useAppDispatch";
import { useCallback } from "react";

const useProduct = () => {
  const product = useSelector((state: RootState) => state.product);

  const dispatch = useAppDispatch<ProductAction>();

  return {
    product,
    getProductById: useCallback(
      (id: number) => dispatch(getProductById(id)),
      [dispatch]
    ),
  };
};

export default useProduct;
