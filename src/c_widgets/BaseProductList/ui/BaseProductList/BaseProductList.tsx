import classNames from 'classnames/bind';
import { Fragment, ReactNode } from 'react';

import { Cart, CartItemCard, CartId } from '@/e_entities/cart';
import { HorizontalLine } from '@/f_shared/index';

import css from './BaseProductList.module.css';

const cn = classNames.bind(css);

type BaseProductListProps = {
  carts: Cart[];
  cardLeftActionSlot?: (cartId: CartId) => ReactNode;
  cardRightActionSlot?: (cartId: CartId) => ReactNode;
  cardCounterSlot?: (cartId: CartId, quantity: number) => ReactNode;
  isFetching?: boolean;
};

export function BaseProductList({
  carts,
  cardLeftActionSlot,
  cardRightActionSlot,
  cardCounterSlot,
  isFetching,
}: BaseProductListProps) {
  return (
    <div className={cn('root', { rootIsFetching: isFetching })}>
      {carts.map((cart) => (
        <Fragment key={`fr-${cart.id}`}>
          <HorizontalLine key={`hr-${cart.id}`} opacity={0.1} />

          <CartItemCard
            key={`card-${cart.id}`}
            product={cart.product}
            leftActionSlot={cardLeftActionSlot ? cardLeftActionSlot(cart.id) : null}
            rightActionSlot={cardRightActionSlot ? cardRightActionSlot(cart.id) : null}
            counterSlot={cardCounterSlot ? cardCounterSlot(cart.id, cart.quantity) : null}
          />
        </Fragment>
      ))}
    </div>
  );
}
