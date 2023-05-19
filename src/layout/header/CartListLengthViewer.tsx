import { selector, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { cartIdListState } from '../../atoms/cartIdListAtom';

const cartProductListLengthState = selector({
  key: 'cartProductListLengthState',
  get: ({ get }) => {
    const cartList = get(cartIdListState);

    return cartList.length;
  },
});

export const CartListLengthViewer = () => {
  const cartListLength = useRecoilValue(cartProductListLengthState);
  return <Style.CartAmount>{cartListLength}</Style.CartAmount>;
};

const Style = {
  CartAmount: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 26px;
    height: 26px;
    border-radius: 26px;

    padding-top: 3px;

    background-color: #04c09e;
    color: white;
    font-size: 16px;
  `,
};
