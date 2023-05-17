import { useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import { DELIVERY_FEE } from '../../constants';
import { cartState } from '../../recoil';
import { CartItem } from '../../types';
import Button from '../common/Button';
import Price from '../Price';

const Order = () => {
  const cart = useRecoilValue(cartState);

  const totalPrice = cart.reduce((acc: 0, cur: CartItem) => {
    return acc + cur.product.price * cur.quantity;
  }, 0);

  return (
    <S.Wrapper>
      <S.Title>결제예상금액</S.Title>
      <S.List>
        <Price price={totalPrice} tag="li" description="총 상품가격" />
        <Price price={DELIVERY_FEE} tag="li" description="총 배송비" />
        <Price price={totalPrice + DELIVERY_FEE} tag="li" description="총 주문금액" />
      </S.List>
      <Button css={orderButtonStyle}>주문하기</Button>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    max-width: 448px;
    margin-top: 50px;
    padding-bottom: 38px;
    border: 1px solid var(--gray-color-100);
  `,

  Title: styled.h3`
    padding: 24px 30px;
    margin-bottom: 34px;
    border-bottom: 3px solid var(--gray-color-100);
    font-size: 20px;
  `,

  List: styled.ul`
    & > li {
      display: flex;
      justify-content: space-between;
      margin: 0 30px 20px;
      font-size: 18px;
      font-weight: 500;

      &:last-child {
        margin: 42px 30px 44px;
      }
    }
  `,
};

const orderButtonStyle = css`
  width: calc(100% - 60px);
  padding: 26px 120px;
  margin: 0 30px;
  background: var(--text-color);
  font-size: 22px;
  color: #fff;
`;

export default Order;
