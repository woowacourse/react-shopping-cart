import React from 'react';
import { Product } from '../../types';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import ICONS from '../../constants/icons';
import * as S from './CartItem.styled';

type Props = {
  product: Product;
  quantity: number;
  checked: boolean;
  onChangeQuantity: React.ChangeEventHandler<HTMLInputElement>;
  onCheck: React.ChangeEventHandler<HTMLInputElement>;
  onClickRemove: React.MouseEventHandler<HTMLButtonElement>;
};

function CartItem({
  product,
  quantity,
  checked,
  onChangeQuantity,
  onCheck,
  onClickRemove,
}: Props) {
  return (
    <S.CartItemBox>
      <S.CartItemInformationBox>
        <Checkbox checked={checked} onChange={onCheck} />
        <S.ImageBox>
          <img src={product.image} alt={product.name} />
        </S.ImageBox>
        <p>{product.name}</p>
      </S.CartItemInformationBox>
      <S.CartItemControlBox>
        <S.Button onClick={onClickRemove}>{ICONS.REMOVE}</S.Button>
        <Input
          type="number"
          min="1"
          max="200"
          step="1"
          onChange={onChangeQuantity}
          value={quantity}
        />
        <p style={{ alignSelf: 'flex-end' }}>
          {(product.price * quantity).toLocaleString('ko-KR')}원
        </p>
      </S.CartItemControlBox>
    </S.CartItemBox>
  );
}

export default CartItem;
