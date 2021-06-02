import { useDispatch, useSelector } from "react-redux";
import { getProducts as _getProducts } from "../store/modules/productSlice";

// eslint-disable-next-line import/prefer-default-export
export const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, errorMessage } = useSelector(
    (state) => state.product
  );

  const getProducts = () => {
    dispatch(_getProducts());
  };

  const getProduct = (id) => products[id];

  return { products, getProducts, getProduct, loading, errorMessage };
};
