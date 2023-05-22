import React, { useEffect } from 'react';
import TRASH_BIN from '../../../assets/png/trash_bin.png';
import Flex from '../../common/Flex';
import * as S from './CartItem.styles';
import { CartItem as CartItemType } from '../../../types/cart';
import useCart from '../../../hooks/cart/useCart';
import Button from '../../common/Button';
import useCounter from '../../../hooks/common/useCounter';
import useCheckedIdCart from '../../../hooks/cart/useCheckedIdCart';

const CartItem = ({ product, id, quantity: initialQuantity }: CartItemType) => {
  const { imageUrl, name, price } = product;
  const [quantity, increase, decrease] = useCounter({
    initialValue: initialQuantity,
    min: 1,
    max: 100,
  });
  const { deleteInCart, adjustQuantityInCart } = useCart();
  const { toggleItemCheckedState, deleteInCheckedCart, isChecked } =
    useCheckedIdCart();

  useEffect(() => {
    adjustQuantityInCart(id, quantity);
  }, [quantity]);

  const removeItemFromCart = () => {
    deleteInCart(id);
    deleteInCheckedCart(id);
  };

  return (
    <S.Container>
      <S.CheckBox
        type="checkbox"
        onChange={() => toggleItemCheckedState(id)}
        checked={isChecked(id)}
      />
      <S.Thumbnail src={imageUrl} alt={name} />
      <S.Name>{name}</S.Name>
      <Flex dir="column" height="100%" justify="space-between" align="end">
        <S.DeleteButton type="button" onClick={removeItemFromCart}>
          <S.DeleteImage src={TRASH_BIN} alt="쓰레기통 아이콘" />
        </S.DeleteButton>
        <Flex>
          <Button
            aria-label="장바구니에 1개 빼기"
            size="S"
            view="light"
            type="button"
            onClick={decrease}
          >
            ▼
          </Button>
          <S.Quantity>{quantity}</S.Quantity>
          <Button
            id="increase"
            aria-label="장바구니에서 1개 추가"
            size="S"
            view="light"
            type="button"
            onClick={increase}
          >
            ▲
          </Button>
        </Flex>
        <S.Price>{(price * quantity).toLocaleString()}원</S.Price>
      </Flex>
    </S.Container>
  );
};

export default CartItem;
