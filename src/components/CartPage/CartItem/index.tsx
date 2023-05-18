import React, { useRef } from 'react';
import TRASH_BIN from '../../../assets/png/trash_bin.png';
import Flex from '../../common/Flex';
import QuantityStepper from '../../common/QuantityStepper';
import * as S from './CartItem.styles';
import { CartItem as CartItemType } from '../../../types/cart';
import useCart from '../../../hooks/cart/useCart';

const CartItem = ({ product, id, quantity }: CartItemType) => {
  const { imageUrl, name, price } = product;
  const quantityRef = useRef<HTMLInputElement>(null);
  const { deleteInCart, adjustQuantityInCart } = useCart();

  return (
    <S.Container>
      <S.CheckBox type="checkbox" checked={true} />
      <S.Thumbnail src={imageUrl} alt={name} />
      <S.Name>{name}</S.Name>
      <Flex dir="column" height="100%" justify="space-between" align="end">
        <S.DeleteButton type="button" onClick={() => deleteInCart(id)}>
          <S.DeleteImage src={TRASH_BIN} alt="쓰레기통 아이콘" />
        </S.DeleteButton>
        <div
          onClick={() => {
            adjustQuantityInCart(id, Number(quantityRef.current!.value));
          }}
        >
          <QuantityStepper
            ref={quantityRef}
            label="장바구니 아이템 수량"
            initialValue={quantity}
          />
        </div>
        <S.Price>{(price * quantity).toLocaleString()}</S.Price>
      </Flex>
    </S.Container>
  );
};

export default CartItem;
