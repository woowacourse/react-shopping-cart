import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../constants/status";
import {
  fetchAllProducts,
  selectAllProducts,
  selectProductStatus,
} from "../store/modules/productSlice";

const useProductSelector = (selector = selectAllProducts) => {
  const dispatch = useDispatch();
  const productStatus = useSelector(selectProductStatus);

  useEffect(() => {
    if (productStatus === STATUS.IDLE) {
      dispatch(fetchAllProducts());
    }
  }, [productStatus, dispatch]);

  return useSelector(selector);
};

export default useProductSelector;
