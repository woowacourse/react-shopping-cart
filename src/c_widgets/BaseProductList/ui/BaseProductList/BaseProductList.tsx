import classNames from 'classnames/bind';
import { Fragment, ReactNode } from 'react';

import { CartItemCard } from '@/e_entities/cart';
import { CartItem, HorizontalLine } from '@/f_shared';

import css from './BaseProductList.module.css';

const cn = classNames.bind(css);

interface BaseProductListProps {
  cartItems: CartItem[];
  cardLeftActionSlot?: (cartItemId: CartItemId) => ReactNode;
  cardRightActionSlot?: (cartItemId: CartItemId) => ReactNode;
  cardCounterSlot?: (cartItemId: CartItemId, quantity: number) => ReactNode;
  isFetching?: boolean;
}

export function BaseProductList({
  cartItems,
  cardLeftActionSlot,
  cardRightActionSlot,
  cardCounterSlot,
  isFetching,
}: BaseProductListProps) {
  return (
    <div className={cn('root', { rootIsFetching: isFetching })}>
      {cartItems.map((cart) => (
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
