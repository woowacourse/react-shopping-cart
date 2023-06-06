import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { cartItemsSelector } from '../../recoil/selectors/cartItemsSelector';

export const CartListLengthViewer = () => {
  const { cartItemsLength } = useRecoilValue(cartItemsSelector);
  return <Style.CartAmount>{cartItemsLength}</Style.CartAmount>;
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
