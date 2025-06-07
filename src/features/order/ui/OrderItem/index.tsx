import { SyntheticEvent } from 'react';
import * as S from './OrderItem.styled';
import DefaultItemIcon from '@assets/icons/default-item.svg';
import { CartItemType } from '@entities/cart/type/cartItem.type';

interface OrderItemProps {
  item: CartItemType;
}

export default function OrderItem({ item }: OrderItemProps) {
  const { quantity, product } = item;
  const { name, price, imageUrl } = product;

  const imageLoadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = DefaultItemIcon;
  };

  return (
    <S.Item>
      <S.ItemContent>
        <S.ItemImage
          src={imageUrl ?? DefaultItemIcon}
          alt={`${name} 상품`}
          onError={imageLoadError}
        />
        <S.ItemDetail>
          <S.ItemDetailInfo>
            <S.ItemName>{name}</S.ItemName>
            <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
          </S.ItemDetailInfo>
          <S.ItemQuantity>{quantity}개</S.ItemQuantity>
        </S.ItemDetail>
      </S.ItemContent>
    </S.Item>
  );
}
