import styled from 'styled-components';
import { getCommaAddedNumber } from '../../../utils/number';
import { useRecoilValue } from 'recoil';
import { priceSummaryState } from '../../../recoil/selectors/priceSummary';

export const OrderSummarySection = () => {
  const { totalProductPrice, deliveryPrice, totalPrice } =
    useRecoilValue(priceSummaryState);

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderTitle>결제예상금액</Style.HeaderTitle>
      </Style.Header>
      <Style.Content>
        <Style.TotalPriceSummary>
          <Style.Caption>총 상품가격</Style.Caption>
          <Style.Caption>
            {getCommaAddedNumber(totalProductPrice)}원
          </Style.Caption>
        </Style.TotalPriceSummary>
        <Style.TotalDeliveryPriceSummary>
          <Style.Caption>총 배송비</Style.Caption>
          <Style.Caption>{getCommaAddedNumber(deliveryPrice)}원</Style.Caption>
        </Style.TotalDeliveryPriceSummary>
        <Style.TotalOrderPriceSummary>
          <Style.Caption>총 주문 금액</Style.Caption>
          <Style.Caption>{getCommaAddedNumber(totalPrice)}원</Style.Caption>
        </Style.TotalOrderPriceSummary>
        <Style.OrderButton>주문하기</Style.OrderButton>
      </Style.Content>
    </Style.Container>
  );
};

const Style = {
  Container: styled.section`
    width: 448px;
    height: 410px;

    margin-top: 49px;

    border: 1px solid #dddddd;
    position: sticky;
    top: 80px;
  `,
  Header: styled.div`
    width: 448px;
    height: 81px;

    padding: 30px;

    border-bottom: 3px solid #dddddd;
  `,
  HeaderTitle: styled.h2`
    font-size: 24px;
  `,
  Content: styled.div`
    width: 448px;
    height: 329px;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 34px;
  `,
  TotalPriceSummary: styled.div`
    width: 388px;
    display: flex;

    justify-content: space-between;

    margin-bottom: 19px;
  `,
  TotalDeliveryPriceSummary: styled.div`
    width: 388px;
    display: flex;

    justify-content: space-between;
    margin-bottom: 41px;
  `,
  TotalOrderPriceSummary: styled.div`
    width: 388px;
    display: flex;

    justify-content: space-between;
    margin-bottom: 43px;
  `,
  Caption: styled.span`
    font-size: 20px;
  `,
  OrderButton: styled.button`
    width: 388px;
    height: 73px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #333333;
    font-size: 24px;
    color: #ffffff;
    font-family: var(--baemin-font);
  `,
};
