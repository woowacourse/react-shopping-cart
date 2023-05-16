import { styled } from 'styled-components';
import { GarbageIcon } from '../assets/svg';
import Button from './common/Button';
import Stepper from './Stepper';

export const CartItem = () => {
  return (
    <Style.CartItem>
      <Style.LeftInfo>
        <Style.Checkbox type="checkbox" />
        <Style.ProductImage />
        <Style.ProductName>[든든] 야채바삭 김말이 700g</Style.ProductName>
      </Style.LeftInfo>
      <Style.RightInfo>
        <Button designType="square">
          <GarbageIcon />
        </Button>
        <Stepper productId={1} count={1} />
        <Style.ProductPrice>5,100원</Style.ProductPrice>
      </Style.RightInfo>
    </Style.CartItem>
  );
};

const Style = {
  CartItem: styled.div`
    display: flex;
    justify-content: space-between;

    width: 735px;
    padding: 33px 0;

    color: var(--grey-400);
  `,

  LeftInfo: styled.div`
    display: flex;
  `,

  Checkbox: styled.input`
    width: 28px;
    height: 28px;

    margin: 0;

    background-color: var(--grey-100);

    border-radius: 2px;
  `,

  ProductImage: styled.div`
    width: 144px;
    height: 147px;

    margin: 0 20px 0 15px;

    background-image: url('https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg');
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
