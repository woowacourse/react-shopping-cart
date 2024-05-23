import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { Product, ProductCard, OrderId } from '@/e_entities/product';

import css from './BaseProductList.module.css';

const cn = classNames.bind(css);

type BaseProductListProps = {
  products: Product[];
  cardLeftActionSlot?: (orderId: OrderId) => ReactNode;
  cardRightActionSlot?: (orderId: OrderId) => ReactNode;
  cardCounterSlot?: (orderId: OrderId, quantity: number) => ReactNode;
  isFetching?: boolean;
};

export function BaseProductList({
  products,
  cardLeftActionSlot,
  cardRightActionSlot,
  cardCounterSlot,
  isFetching,
}: BaseProductListProps) {
  return (
    <div className={cn('root', { rootIsFetching: isFetching })}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          leftActionSlot={cardLeftActionSlot ? cardLeftActionSlot(product.id) : null}
          rightActionSlot={cardRightActionSlot ? cardRightActionSlot(product.id) : null}
          counterSlot={cardCounterSlot ? cardCounterSlot(product.id, quantity) : null}
        />
      ))}
    </div>
  );
}
