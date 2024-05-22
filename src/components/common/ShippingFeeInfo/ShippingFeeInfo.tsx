import { PRICE } from '@constants/shippingCart';
import { formatKoreanCurrency } from '@utils/currency';

import * as Styled from './ShippingFeeInfo.styled';

function ShippingFeeInfo() {
  return (
    <Styled.ShippingFeeInfo>
      총 주문 금액이 {formatKoreanCurrency(PRICE.freeShippingMinAmount)} 이상일 경우 무료 배송됩니다.
    </Styled.ShippingFeeInfo>
  );
}

export default ShippingFeeInfo;
