import { ChangeEventHandler } from 'react';
import QuantityInput from '../main/QuantityInput';
import { CartItem } from '../../types';
import { changeInvalidValueToBlank } from '../../utils/changeInvalidValueToBlank';
import { useRecoilCallback } from 'recoil';
import {
  SelectorParams,
  removeProductItemFromCartSelector,
  updateCartSelector,
} from '../../store/CartSelector';
import { NOT_NUMBER } from '../../constants';
import { styled } from 'styled-components';
import { BsFillTrash3Fill } from 'react-icons/bs';

interface Props {
  item: CartItem;
}

const CartListItem = ({ item }: Props) => {
  const updateCart = useRecoilCallback(({ set }) => ({ id, quantity }: SelectorParams) => {
    set(updateCartSelector({ id, quantity }), 0);
  });

  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    const newQuantity = changeInvalidValueToBlank(value, NOT_NUMBER);
    updateCart({ id: item.id, quantity: newQuantity });
  };

  const removeFromCart = () => {
    removeProductItemFromCart(item.id);
  };

  return (
    <S.Wrapper>
      <img src={`${process.env.PUBLIC_URL}${item.product.imageUrl}`} alt={String(item.id)} />
      <p>{item.product.name}</p>
      <S.RemoveButton onClick={removeFromCart}>
        <BsFillTrash3Fill size={24} />
      </S.RemoveButton>
      <QuantityInput
        id={String(item.id)}
        value={item.quantity}
        onChange={handleNumberInputChange}
      />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 30px;

    img {
      width: 145px;
      height: auto;
    }

    & > :nth-child(3) {
      position: absolute;
      right: 0px;
    }

    & > :nth-child(4) {
      position: absolute;
      top: 60px;
      right: 0px;
    }
  `,
  RemoveButton: styled.button`
    background-color: transparent;
    cursor: pointer;
  `,
};

export default CartListItem;
