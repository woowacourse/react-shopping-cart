import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';
import { GarbageIcon } from '../assets/svg';
import { useProductInCartById } from '../recoils/recoilCart';
import { useCheckedState } from '../recoils/recoilChecked';
import { Button } from './common/Button';
import { Stepper } from './Stepper';
import { Checkbox } from './styled';

interface CartItemProps {
  productId: number;
  setTotalProductPrice: Dispatch<SetStateAction<number>>;
}

export const CartItem = ({ productId, setTotalProductPrice }: CartItemProps) => {
  const { quantity, product } = useProductInCartById(productId)!;
  const [checkState, setCheckState] = useCheckedState();

  const onChangeCheckBox = () => {
    setCheckState((prev) => {
      if (prev[product.id]) {
        setTotalProductPrice((prev) => prev - product.price * quantity);

        const { [product.id]: _, ...updatedState } = prev;
        return {
          ...updatedState,
          all: false,
        };
      }

      setTotalProductPrice((prev) => prev + product.price * quantity);

      return {
        ...prev,
        [product.id]: true,
      };
    });
  };

  return (
    <Style.CartItem>
      <Style.LeftInfo>
        <Style.Checkbox
          type="checkbox"
          checked={Boolean(checkState[product.id])}
          onChange={onChangeCheckBox}
        />
        <Style.ProductImage path={product.imageUrl} />
        <Style.ProductName>{product.name}</Style.ProductName>
      </Style.LeftInfo>
      <Style.RightInfo>
        <Button designType="square">
          <GarbageIcon />
        </Button>
        <Stepper productId={product.id} quantity={quantity} />
        <Style.ProductPrice>{product.price}</Style.ProductPrice>
      </Style.RightInfo>
    </Style.CartItem>
  );
};

const Style = {
  CartItem: styled.li`
    display: flex;
    justify-content: space-between;

    width: 735px;
    padding: 33px 0;

    color: var(--grey-400);

    &:first-child {
      border-top: 4px solid var(--grey-300);
    }

    &:not(:last-child) {
      border-bottom: 1.5px solid var(--grey-400);
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
  `,

  ProductName: styled.div`
    font-size: 20px;

    font-weight: 400;
  `,

  RightInfo: styled.div`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: flex-end;
  `,

  ProductPrice: styled.div``,
};
