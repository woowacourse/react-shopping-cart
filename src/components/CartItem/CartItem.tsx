// import { GetCartItemsResponse } from '@/types';
import { css } from '@emotion/react';
// import { useCartItem } from '../../hooks';
import * as S from './CartItem.styles';
import Button from '../Button/Button';
import PlusMinusButton from '../PlusMinusButton/PlusMinusButton';

interface CartItemProps {
  cartItem: any;
  refetchCartItems: () => Promise<void>;
}

export default function CartItem() {
  const {
    product: { imageUrl, price, name },
    quantity,
  } = {
    product: {
      imageUrl: 'https://example.com/image.jpg',
      price: 10000,
      name: 'Sample Product',
    },
    quantity: 2,
  };

  //   const { increaseCartItem, decreaseCartItem, deleteCartItem } = useCartItem();

  return (
    <S.ProductCardCartItemWrapper>
      <S.CartItemImageWrapper>
        <S.CartItemImage src={'/images/Star.png'} alt={name} />
      </S.CartItemImageWrapper>
      <S.CartItemInfoWrapper>
        <S.CartItemName>{name}</S.CartItemName>
        <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
        <PlusMinusButton quantity={quantity} onAddButtonClick={() => {}} onMinusButtonClick={() => {}} />
        <Button
          onClick={async () => {}}
          css={css`
            position: absolute;
            right: 0;
            top: 8px;
            background-color: #fff;
            width: fit-content;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            padding: 4px 8px;
            color: #000000;
          `}
        >
          삭제
        </Button>
      </S.CartItemInfoWrapper>
    </S.ProductCardCartItemWrapper>
  );
}
