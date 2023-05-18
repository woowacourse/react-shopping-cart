import QuantityInput from '../QuantityInput';
import { CartItem } from '../../types';
import { styled } from 'styled-components';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useHandleProduct } from '../../hooks/useHandleProduct';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

interface Props {
  item: CartItem;
  setCheckItems: Dispatch<SetStateAction<number[]>>;
}

const CartListItem = ({ item, setCheckItems }: Props) => {
  const {
    removeFromCart,
    handleNumberInputChange,
    handleIncreaseItem,
    handleDecreaseCartItem,
  } = useHandleProduct(item.id);

  const handleRemoveFromCart = (id: number) => (e: MouseEvent<HTMLButtonElement>) => {
    setCheckItems((prev) => prev.filter((itemId) => itemId !== id));
    removeFromCart();
  };

  return (
    <S.Wrapper>
      <img src={`${process.env.PUBLIC_URL}${item.product.imageUrl}`} alt={String(item.id)} />
      <S.Name>{item.product.name}</S.Name>
      <S.RemoveButton onClick={handleRemoveFromCart(item.id)}>
        <BsFillTrash3Fill size={24} />
      </S.RemoveButton>
      <QuantityInput
        id={String(item.id)}
        value={item.quantity}
        onChange={handleNumberInputChange}
        onIncrement={handleIncreaseItem}
        onDecrement={handleDecreaseCartItem}
      />
      <S.Price>{item.product.price}원</S.Price>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 735px;
    padding: 30px;

    img {
      width: 145px;
      height: auto;
    }

    & > :nth-child(3) {
      position: absolute;
      right: 40px;
    }

    & > :nth-child(4) {
      position: absolute;
      top: 70px;
      right: 40px;
    }
  `,

  CheckBox: styled.input`
    width: 28px;
    height: 28px;
    margin-right: 15px;
  `,

  RemoveButton: styled.button`
    background-color: transparent;
    cursor: pointer;
  `,

  Name: styled.p`
    margin-left: 20px;
    font-size: 20px;
  `,

  Price: styled.p`
    position: absolute;
    right: 40px;
    bottom: 30px;
  `,
};

export default CartListItem;
