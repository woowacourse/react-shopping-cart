import { useSelector } from "react-redux";
import { getProductById } from "../modules/product";
import { RootState } from "../modules";
import { ProductAction } from "../modules/product/type";
import { useAppDispatch } from "./useAppDispatch";

const useProduct = () => {
  const product = useSelector((state: RootState) => state.product);

  const dispatch = useAppDispatch<ProductAction>();

  return {
    product,
    getProductById: (id: number) => dispatch(getProductById(id)),
  };
};

export default useProduct;
