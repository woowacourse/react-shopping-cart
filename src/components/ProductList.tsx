import React from 'react';
import { Products } from '../types/Product';

interface ProductListProps {
  products: Products[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((product: Products) => {
          const productDetail = product.product;
          return (
            <li key={productDetail.id}>
              {productDetail.name}
              <img src={productDetail.imageUrl} alt={productDetail.name} />
              {productDetail.name} - {productDetail.price}원
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductList;
