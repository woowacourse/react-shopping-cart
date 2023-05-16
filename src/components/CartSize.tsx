import { useCartSizeValue } from '../recoilCart';

import { styled } from 'styled-components';

export const CartSize = () => {
  const cartSize = useCartSizeValue();

  return <Style.CartSize>{cartSize}</Style.CartSize>;
};

const Style = {
  CartSize: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;

    border-radius: 50%;

    background-color: #04c09e;
  `,
};
