import React from "react";
import { css } from "@emotion/css";
import { Product } from "../../types/product";
import { ProductInfo, Splitter } from "../default";

interface OrderItemProps {
  product: Product;
}

const OrderItem = ({ product }: OrderItemProps) => {
  return (
    <div className={OrderItemCSS}>
      <Splitter />
      <ProductInfo
        product={product}
        quantityNode={<div>{product.quantity}개</div>}
      />
    </div>
  );
};

export default OrderItem;

const OrderItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
