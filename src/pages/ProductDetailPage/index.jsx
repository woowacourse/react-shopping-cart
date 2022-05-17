import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import ProductDetailCard from "./ProductDetailCard";

import { useProductDetail } from "../../hooks/useProductDetail";

function ProductDetailPage() {
  const { id: productId } = useParams();

  const { product, isLoading, errorMessage } = useProductDetail(productId);

  if (isLoading) return <Spinner />;
  if (errorMessage) return <div>😱 Error: {errorMessage} 😱</div>;

  return <ProductDetailCard product={product} />;
}

export default ProductDetailPage;
