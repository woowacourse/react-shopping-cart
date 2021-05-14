import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  return <span>{productId}</span>;
};

export default ProductDetail;
