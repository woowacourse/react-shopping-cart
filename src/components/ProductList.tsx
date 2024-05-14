import React from 'react';
import { Products } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Products[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((product: Products) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
}

export default ProductList;
