import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../components/common/Spinner";
import ProductDetailCard from "./ProductDetailCard";
import { getProductDetail } from "./../../store/actions";

function ProductDetailPage() {
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const {
    data: selectedProduct,
    loading: isLoading,
    errorMessage,
  } = useSelector((state) => state.productDetailReducer.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, []);

  if (isLoading) return <Spinner />;
  if (errorMessage) return <div>😱 Error: {errorMessage} 😱</div>;

  return <ProductDetailCard product={selectedProduct} />;
}

export default ProductDetailPage;
