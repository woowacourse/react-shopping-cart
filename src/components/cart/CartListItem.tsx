import QuantityInput from '../QuantityInput';
import { CartItem } from '../../types';
import { styled } from 'styled-components';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useProduct } from '../../hooks/useProduct';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

interface Props {
  item: CartItem;
  setCheckItems: Dispatch<SetStateAction<number[]>>;
}

const CartListItem = ({ item, setCheckItems }: Props) => {
  const {
    removeItem,
    handleNumberInputChange,
    handleIncreaseItem,
    handleDecreaseCartItem,
  } = useProduct(item.id);

  const handleRemoveFromCart = (id: number) => (e: MouseEvent<HTMLButtonElement>) => {
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmResult) {
      setCheckItems((prev) => prev.filter((itemId) => itemId !== id));
      removeItem();
    }
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
      <S.Price>{(item.product.price * item.quantity).toLocaleString()}원</S.Price>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
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

    @media (min-width: 480px) and (max-width: 767px) {
      flex-direction: column;

      & > :nth-child(2) {
        margin: 20px 0 0 0;
      }

      & > :nth-child(3) {
        position: absolute;
      }

      & > :nth-child(4) {
        position: absolute;
        bottom: 0;
        right: 40px;
      }
    }

    @media all and (max-width: 479px) {
      flex-direction: row;
      align-items: flex-start;

      img {
        width: 50px;
        height: auto;
      }
      & > :nth-child(3) {
        right: 20px;
      }

      & > :nth-child(4) {
        top: 80px;
        left: 20px;
      }

      & > :last-child {
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }
  `,

  CheckBox: styled.input`
    width: 28px;
    min-width: 28px;
    height: 28px;
    min-height: 28px;
    margin-right: 15px;
  `,

  RemoveButton: styled.button`
    background-color: transparent;
    cursor: pointer;
  `,

  Name: styled.p`
    margin-left: 20px;
    font-size: 20px;
    @media all and (max-width: 479px) {
      font-size: 16px;
    }
  `,

  Price: styled.p`
    position: absolute;
    right: 40px;
    bottom: 30px;

    @media all and (max-width: 479px) {
      position: absolute;
      bottom: 12px;
      right: 120px;
    }
  `,
};

export default CartListItem;
