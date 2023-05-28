import * as styled from './OrderSummary.styled';

import { useTotalProductPrice } from '../../recoils/recoilTotalPrice';

import { Button } from '../common/Button/Button';

import { DELIVERY_CHARGE } from '../../constants';
import { useCheckedLength } from '../../recoils/recoilChecked';

export const OrderSummary = () => {
  const totalProductPrice = useTotalProductPrice();

  const checkedLength = useCheckedLength();

  const DeliveryCharge = DELIVERY_CHARGE;

  return (
    <>
      <>
        <styled.OrderSummary>
          <styled.OrderSummaryHeader>결제예상금액</styled.OrderSummaryHeader>
          <styled.Content>
            <styled.Prices>
              <styled.Price>
                <span>총 선택상품금액</span>
                <span>{totalProductPrice.toLocaleString('ko-kr')}원</span>
              </styled.Price>
              <styled.Price>
                <span>배송비</span>
                <span>+ {DeliveryCharge.toLocaleString('ko-kr')}원</span>
              </styled.Price>
              <styled.Price>
                <span>예상 주문금액</span>
                <span>{(totalProductPrice + DeliveryCharge).toLocaleString('ko-kr')}원</span>
              </styled.Price>
            </styled.Prices>
            <Button designType="rectangle">
              총 {checkedLength}건 주문하기(
              {(totalProductPrice + DeliveryCharge).toLocaleString('ko-kr')}원)
            </Button>
          </styled.Content>
        </styled.OrderSummary>
      </>
      <>
        <styled.OrderSummaryM>
          <styled.OrderButtonM>
            <styled.SelectedProductLength>{checkedLength}</styled.SelectedProductLength>
            <styled.ButtonRole>주문하기</styled.ButtonRole>
            <styled.TotalPriceM>
              {(totalProductPrice + DeliveryCharge).toLocaleString('ko-kr')}원
            </styled.TotalPriceM>
          </styled.OrderButtonM>
        </styled.OrderSummaryM>
      </>
    </>
  );
};
