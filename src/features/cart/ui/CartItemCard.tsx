/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Button from '../../../shared/ui/Button';
import SelectInput from '../../../shared/ui/SelectInput';
import * as S from './CartItemCard.styles';
import CartItemQuantitySelector from './CartItemQuantitySelector';
import { CartItem } from '../../../shared/types/cart';
import { useCartContext } from '../../../shared/context/useCartContext';
import { deleteCartItem } from '../api/deleteCartItem';

const deleteButtonCSS = css`
  width: 40px;
  height: 28px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  &:hover {
    background-color: #f8f8f8;
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

interface CartItemCardProps {
  cartItem: CartItem;
}

export default function CartItemCard({ cartItem }: CartItemCardProps) {
  const { selectedCartItems, updateSelectedCartItem, removeSelectedCartItem } = useCartContext();
  const handleSelectedCartItemUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      removeSelectedCartItem(cartItem);
      return;
    }
    updateSelectedCartItem(cartItem, cartItem.quantity);
  };

  const isSelected = selectedCartItems.some((item) => item.id === cartItem.id);

  const handleCartItemDelete = async () => {
    try {
      await deleteCartItem(cartItem.id);
      removeSelectedCartItem(cartItem);
    } catch (error) {
      if (error instanceof Error) {
        console.error('장바구니 아이템 삭제 실패:', error.message);
        alert('장바구니 아이템 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <S.CartItemContainer data-testid='cart-item-card'>
      <S.CartItemHeader>
        <SelectInput type='checkbox' onChange={handleSelectedCartItemUpdate} checked={isSelected} />
        <Button title='삭제' css={deleteButtonCSS} onClick={handleCartItemDelete} />
      </S.CartItemHeader>
      <S.CartItemContent>
        <S.CartItemImage
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = './default-product.jpg';
          }}
        />
        <S.CartItemInfo>
          <S.CartItemInfoDetails>
            <S.CartItemInfoName data-testid='cart-item-name'>{cartItem.product.name}</S.CartItemInfoName>
            <S.CartItemInfoPrice data-testid='card-item-price'>
              {cartItem.product.price.toLocaleString()}원
            </S.CartItemInfoPrice>
          </S.CartItemInfoDetails>

          <CartItemQuantitySelector cartItem={cartItem} isSelected={isSelected} />
        </S.CartItemInfo>
      </S.CartItemContent>
    </S.CartItemContainer>
  );
}
