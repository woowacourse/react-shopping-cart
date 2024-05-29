import React from "react";
import { css } from "@emotion/css";
import { Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductInfoProps {
  product: Product;
  quantityNode?: React.ReactNode;
}

const ProductInfo = ({ product, quantityNode }: ProductInfoProps) => {
  return (
    <div className={ProductInfoCSS}>
      <img
        src={product.product.imageUrl}
        className={ProductImageCSS}
        alt={product.product.name}
      />
      <div className={ProductDetailsCSS}>
        <div className={ProductNameCSS}>{product.product.name}</div>
        <div className={ProductPriceCSS}>{formatCurrency(product.product.price)}</div>
        {quantityNode && <div className={ProductQuantityWrapperCSS}>{quantityNode}</div>}
      </div>
    </div>
  );
};

export default ProductInfo;

const ProductInfoCSS = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ProductImageCSS = css`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

const ProductDetailsCSS = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProductNameCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;

const ProductPriceCSS = css`
  font: var(--cart-title);
`;

const ProductQuantityWrapperCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;
