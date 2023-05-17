import { styled } from 'styled-components';
import Button from './common/Button';

export const OrderSummary = () => {
  return (
    <Style.OrderSummary>
      <Style.Title>결제예상금액</Style.Title>
      <Style.Content>
        <Style.Prices>
          <Style.Price>
            <span>총 상품가격</span>
            <span>21,700원</span>
          </Style.Price>
          <Style.Price>
            <span>총 배송비</span>
            <span>3,000원</span>
          </Style.Price>
          <Style.Price>
            <span>총 주문금액</span>
            <span>24,700원</span>
          </Style.Price>
        </Style.Prices>
        <Button designType="rectangle">주문하기</Button>
      </Style.Content>
    </Style.OrderSummary>
  );
};

const Style = {
  OrderSummary: styled.section`
    position: -webkit-sticky;
    position: sticky;

    top: 100px;

    width: 448px;
    height: fit-content;

    border: 1px solid var(--grey-200);
  `,

  Title: styled.h2`
    padding: 22px 30px;

    border-bottom: 3px solid var(--grey-200);

    color: var(--grey-400);

    font-size: 24px;

    letter-spacing: 0.5px;
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    padding: 36px;
  `,

  Prices: styled.div`
    padding: 0 6px;

    width: 100%;
  `,

  Price: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    margin-bottom: 42px;

    font-style: normal;
    font-weight: 700;
    font-size: 18px;

    letter-spacing: 0.5px;

    &:first-child {
      margin-bottom: 20px;
    }
  `,
};
