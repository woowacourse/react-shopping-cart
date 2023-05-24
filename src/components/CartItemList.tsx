import { styled } from 'styled-components';

import { useUpdateCart } from '../hooks/useUpdateCart';
import { useCartStateValue } from '../recoils/recoilCart';
import { useCheckedState } from '../recoils/recoilChecked';

import { Button } from './common/Button';
import { Checkbox } from './styled';

import { GarbageIcon } from '../assets/svg';
import { Stepper } from './Stepper';

import { CartItemType } from '../types';

export const CartItemList = () => {
  const cart = useCartStateValue();

  const { deleteCartItem } = useUpdateCart();

  const [checkState, setCheckState] = useCheckedState();

  const onChangeCheckBox = (id: CartItemType['id']) => {
    setCheckState((prev) => {
      if (prev[id]) {
        const { [id]: _, ...updatedState } = prev;
        return {
          ...updatedState,
          all: false,
        };
      }
      return {
        ...prev,
        [id]: true,
      };
    });
  };

  const onClickDeleteIcon = (id: CartItemType['id']) => {
    if (checkState[id]) {
      setCheckState((prev) => {
        const { [id]: _, ...updatedState } = prev;

        return updatedState;
      });
    }

    deleteCartItem(id);
  };

  return (
    <ul>
      {cart.map(({ id, quantity, product }) => (
        <Style.CartItem key={id}>
          <Style.LeftInfo>
            <Style.Checkbox
              type="checkbox"
              checked={Boolean(checkState[id])}
              onChange={() => onChangeCheckBox(id)}
            />
            <Style.ProductImage path={product.imageUrl} />
            <Style.ProductName>{product.name}</Style.ProductName>
          </Style.LeftInfo>
          <Style.RightInfo>
            <Button designType="square" onClick={() => onClickDeleteIcon(id)}>
              <GarbageIcon />
            </Button>
            <Stepper cartId={id} quantity={quantity} />
            <Style.ProductPrice>{product.price.toLocaleString('ko-KR')}원</Style.ProductPrice>
          </Style.RightInfo>
        </Style.CartItem>
      ))}
    </ul>
  );
};

const Style = {
  CartItem: styled.li`
    display: flex;
    justify-content: space-between;

    color: var(--grey-400);

    &:first-child {
      border-top: 4px solid var(--grey-300);
    }

    &:not(:last-child) {
      border-bottom: 1.5px solid var(--grey-400);
    }

    @media screen and (min-width: 501px) {
      width: 735px;
      padding: 33px 0;
    }

    @media screen and (max-width: 500px) {
      padding: 20px 0;
    }
  `,

  LeftInfo: styled.div`
    display: flex;
  `,

  Checkbox: styled(Checkbox)``,

  ProductImage: styled.div<{ path: string }>`
    width: 144px;
    height: 147px;

    margin: 0 20px 0 15px;

    background-image: ${(props) => `url(${props.path})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    @media screen and (max-width: 500px) {
      width: 96px;
      height: 98px;

      margin: 0 6px;
    }
  `,

  ProductName: styled.div`
    font-size: 20px;

    font-weight: 400;
    padding-top: 5px;

    @media screen and (max-width: 500px) {
      font-size: 15px;
    }
  `,

  RightInfo: styled.div`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: flex-end;
  `,

  ProductPrice: styled.div`
    @media screen and (max-width: 500px) {
      font-size: 15px;
    }
  `,
};
