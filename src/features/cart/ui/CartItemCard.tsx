/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Button from '../../../shared/ui/Button';
import SelectInput from '../../../shared/ui/SelectInput';
import * as S from './CartItemCard.styles';
import CartItemQuantitySelector from './CartItemQuantitySelector';
import { Product } from '../../../shared/type/cart';

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

export default function CartItemCard({ cartItem }: { cartItem: Product }) {
  return (
    <S.CartItemContainer>
      <S.CartItemHeader>
        <SelectInput type='checkbox' />
        <Button title='삭제' css={deleteButtonCSS} />
      </S.CartItemHeader>
      <S.CartItemContent>
        <S.CartItemImage
          src={cartItem.imageUrl}
          alt={cartItem.name}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = './default-product.jpg';
          }}
        />
        <S.CartItemInfo>
          <S.CartItemInfoDetails>
            <S.CartItemInfoName>{cartItem.name}</S.CartItemInfoName>
            <S.CartItemInfoPrice>{cartItem.price.toLocaleString()}원</S.CartItemInfoPrice>
          </S.CartItemInfoDetails>

          <CartItemQuantitySelector />
        </S.CartItemInfo>
      </S.CartItemContent>
    </S.CartItemContainer>
  );
}
