import { useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import { DELIVERY_FEE } from '../../constants';
import { totalPriceSelector } from '../../recoil';
import Button from '../common/Button';
import Price from '../Price';

const Order = () => {
  const totalPrice = useRecoilValue(totalPriceSelector);

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
  Wrapper: styled.section`
    max-width: 448px;
    max-height: 410px;
    margin-top: 40px;
    padding-bottom: 38px;
    border: 1px solid var(--gray-color-100);
  `,

  Title: styled.h3`
    padding: 24px 30px;
    margin-bottom: 44px;
    border-bottom: 3px solid var(--gray-color-100);
    font-size: 20px;

    @media (max-width: 548px) {
      margin-bottom: 32px;
      font-size: 18px;
    }
  `,

  List: styled.ul`
    & > li {
      display: flex;
      justify-content: space-between;
      margin: 0 30px 20px;
      font-size: 18px;
      font-weight: 600;

      & span {
        font-weight: 500;
      }

      &:last-child {
        margin: 42px 30px 54px;
      }

      @media (max-width: 548px) {
        flex-direction: column;
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        line-height: 1.4;

        &:last-child {
          margin: 32px 30px 34px;
        }
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

  @media (max-width: 548px) {
    padding: 20px 10px;
    font-size: 16px;
  }
`;

export default Order;
