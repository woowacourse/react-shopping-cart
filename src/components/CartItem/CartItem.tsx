// import { GetCartItemsResponse } from '@/types';
import { css } from '@emotion/react';
// import { useCartItem } from '../../hooks';
import * as S from './CartItem.styles';
import Button from '../Button/Button';
import PlusMinusButton from '../PlusMinusButton/PlusMinusButton';
import Checkbox from '../Checkbox/Checkbox';
import useCartQuantity from '../../hooks/useCartQuantity';
import { deleteCartItem } from '../../apis/cartItem';

interface CartItemProps {
  cartItem: any;
  isSelected: boolean;
  handleCheckboxClick: () => void;
}

export default function CartItem({ cartItem, isSelected, handleCheckboxClick }: CartItemProps) {
  const {
    product: { imageUrl, price, name },
    quantity,
  } = cartItem;

  const { handleIncrease, handleDecrease } = useCartQuantity({
    stock: 100,
    selectedCartItem: cartItem,
    onChange: () => {
      console.log('Cart item updated');
    },
    productId: cartItem.product.id,
  });

  return (
    <S.ProductCardCartItemWrapper>
      <S.ButtonWrapper>
        <Checkbox checked={isSelected} onClick={handleCheckboxClick} />

        <Button
          onClick={deleteCartItem.bind(null, cartItem.id)}
          css={css`
            position: ;
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
      </S.ButtonWrapper>
      <S.CartItemWrapper>
        <S.CartItemImageWrapper>
          <S.CartItemImage src={imageUrl} alt={name} />
        </S.CartItemImageWrapper>
        <S.CartItemInfoWrapper>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
          <PlusMinusButton quantity={quantity} onAddButtonClick={handleIncrease} onMinusButtonClick={handleDecrease} />
        </S.CartItemInfoWrapper>
      </S.CartItemWrapper>
    </S.ProductCardCartItemWrapper>
  );
}
