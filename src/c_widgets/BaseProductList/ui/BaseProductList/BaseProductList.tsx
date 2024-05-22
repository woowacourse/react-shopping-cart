import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { Product, ProductCard, ProductId } from '@/e_entities/product';

import css from './BaseProductList.module.css';

const cn = classNames.bind(css);

type BaseProductListProps = {
  products: Product[];
  leftActionSlot?: (productId: ProductId) => ReactNode;
  rightActionSlot?: (productId: ProductId) => ReactNode;
  counterSlot?: (productId: ProductId) => ReactNode;
  isFetching?: boolean;
};

export function BaseProductList({
  products,
  leftActionSlot,
  rightActionSlot,
  counterSlot,
  isFetching,
}: BaseProductListProps) {
  return (
    <div className={cn('root', { rootIsFetching: isFetching })}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          leftActionSlot={leftActionSlot ? leftActionSlot(product.id) : null}
          rightActionSlot={rightActionSlot ? rightActionSlot(product.id) : null}
          counterSlot={counterSlot ? counterSlot(product.id) : null}
        />
      ))}
    </div>
  );
}
