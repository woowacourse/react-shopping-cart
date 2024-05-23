import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { HorizontalLine, Text } from '@/f_shared';

import { Product } from '../../model/types';

import css from './CartItemCard.module.css';

const cn = classNames.bind(css);

interface CartItemCardProps {
  product: Product;

  leftActionSlot?: ReactNode;
  rightActionSlot?: ReactNode;
  counterSlot?: ReactNode;
}

export const CartItemCard = ({ product: product, leftActionSlot, rightActionSlot, counterSlot }: CartItemCardProps) => {
  const { name, price, imageUrl } = product;

  return (
    <div className={cn('root')}>
      <HorizontalLine opacity={0.1} />
      {leftActionSlot || rightActionSlot ? (
        <div className={cn('actionSlotContainer')}>
          {leftActionSlot && <div>{leftActionSlot}</div>}
          {rightActionSlot && <div>{rightActionSlot}</div>}
        </div>
      ) : null}
      <div className={cn('contentContainer')}>
        <div className={cn('imageContainer')}>
          <img className={cn('image')} src={imageUrl} alt={name} />
        </div>
        <div className={cn('contentRight')}>
          <div className={cn('textContainer')}>
            <Text type='b2'>{name}</Text>
            <Text type='h1'>{`${price.toLocaleString()}원`}</Text>
          </div>
          {counterSlot && <div>{counterSlot}</div>}
        </div>
      </div>
    </div>
  );
};
