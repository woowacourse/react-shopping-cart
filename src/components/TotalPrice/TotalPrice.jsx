import styled from 'styled-components';
import { COLOR } from 'constants/styles';
import { BasicButton, BasicDivideLine, Flex } from 'components/shared/basics';

function TotalPrice({ total, quantity }) {
  return (
    <Style.TotalPriceContainer>
      <Style.TotalPriceHeader>
        <Style.CartTitle>결제예상금액</Style.CartTitle>
      </Style.TotalPriceHeader>
      <BasicDivideLine weight="thin" color="lightgray" />
      <div>
        <Style.TotalPriceBox justify="space-between">
          <Style.HighLightText>결제예상금액</Style.HighLightText>
          <Style.HighLightText>{`${total}원`}</Style.HighLightText>
        </Style.TotalPriceBox>
        <Style.OrderButtonWrapper justify="center" align="center">
          <Style.OrderButton type="button">
            {`주문하기(${quantity}개)`}
          </Style.OrderButton>
        </Style.OrderButtonWrapper>
      </div>
    </Style.TotalPriceContainer>
  );
}

TotalPrice.defaultProps = {
  total: 0,
  quantity: 0,
};

export default TotalPrice;

const Style = {
  TotalPriceContainer: styled.section`
    width: 35%;
    height: 260px;
    margin-top: 80px;

    border: 1px solid #dddddd;
  `,
  TotalPriceHeader: styled(Flex)`
    display: flex;
    align-items: center;
    padding: 16px 30px;
  `,
  TotalPriceBox: styled(Flex)`
    padding: 20px;
    margin: 20px;
  `,
  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,
  OrderButtonWrapper: styled(Flex)`
    margin: 30px 10px 0px;
  `,
  OrderButton: styled(BasicButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLOR.PRIMARY};
    color: white;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    margin: 0 20px;
  `,
  HighLightText: styled.span`
    position: relative;
    font-weight: 700;
    display: inline-block;
    text-align: center;
    padding: 0 2px;
    font-size: 20px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8px;
      background-color: #2ac1bc;
      opacity: 0.5;
      z-index: -1;
    }
  `,
};
