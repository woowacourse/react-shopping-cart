/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Button from '../../../shared/ui/Button';
import SelectInput from '../../../shared/ui/SelectInput';
import * as S from './CartItemCard.styles';
import CartItemQuantitySelector from './CartItemQuantitySelector';
import { CartItem } from '../../../shared/type/cart';
import { useSelectedCartContext } from '../../../shared/context/useCartContext';

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

export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
  const { selectedCartItems, updateSelectedCartItem, removeSelectedCartItem } = useSelectedCartContext();
  const handleSelectedCartItemUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      removeSelectedCartItem(cartItem);
      return;
    }
    updateSelectedCartItem(cartItem);
  };

  const isSelected = selectedCartItems.findIndex((item) => item.id === cartItem.id) === -1 ? false : true;

  return (
    <S.CartItemContainer>
      <S.CartItemHeader>
        <SelectInput type='checkbox' onChange={handleSelectedCartItemUpdate} checked={isSelected} />
        <Button title='삭제' css={deleteButtonCSS} />
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
            <S.CartItemInfoName>{cartItem.product.name}</S.CartItemInfoName>
            <S.CartItemInfoPrice>{cartItem.product.price.toLocaleString()}원</S.CartItemInfoPrice>
          </S.CartItemInfoDetails>

          <CartItemQuantitySelector />
        </S.CartItemInfo>
      </S.CartItemContent>
    </S.CartItemContainer>
  );
}
