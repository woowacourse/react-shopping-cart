import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { HorizontalLine, Text } from '@/f_shared';

import { Product } from '../../model/types';

import css from './ProductCard.module.css';

const cn = classNames.bind(css);

interface ProductCardProps {
  product: Product;

  actionSlotLeft?: ReactNode;
  actionSlotRight?: ReactNode;
  counterSlot?: ReactNode;
}

export const ProductCard = ({ product, actionSlotLeft, actionSlotRight, counterSlot }: ProductCardProps) => {
  const { name, price, imageUrl } = product;

  return (
    <div className={cn('root')}>
      <HorizontalLine opacity={0.1} />
      {actionSlotLeft || actionSlotRight ? (
        <div className={cn('actionSlotContainer')}>
          <div>{actionSlotLeft}</div>
          <div>{actionSlotRight}</div>
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
          <div>{counterSlot}</div>
        </div>
      </div>
    </div>
  );
};
