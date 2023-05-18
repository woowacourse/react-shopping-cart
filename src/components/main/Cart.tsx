import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { cartBadgeSelector } from '../../store/CartSelector';

interface Props {
  onClick: () => void;
}

const Cart = ({ onClick }: Props) => {
  const selectedProductsCount = useRecoilValue(cartBadgeSelector);

  return (
    <S.Wrapper onClick={onClick}>
      <S.Button>장바구니</S.Button>
      <S.Badge>{selectedProductsCount}</S.Badge>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
  `,

  Button: styled.button`
    padding: 0;
    margin-right: 8px;
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: #fff;
    cursor: pointer;
  `,

  Badge: styled.div`
    width: 24px;
    height: 24px;
    background: #04c09e;
    border-radius: 50%;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    line-height: 24px;
    color: #fff;
  `,
};

export default Cart;
