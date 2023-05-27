import { useRecoilValue } from 'recoil';
import {
  Typography,
  Typography as ProductPrice,
  Typography as ShippingPrice,
  Typography as TotalPrice,
} from '../ui/Typography';
import * as Styled from './styles/CartTotalPriceContainer.styles';
import { checkboxesState } from '../atoms/CheckboxState';
import { useMemo } from 'react';

const shippingPrice = 3000;

export const CartTotalPriceContainer = () => {
  const checkboxes = useRecoilValue(checkboxesState);
  const getTotalProductPrice = useMemo(
    () =>
      checkboxes.reduce(
        (acc, checkbox) => acc + checkbox.quantity * checkbox.price,
        0
      ),
    [checkboxes]
  );

  return (
    <Styled.Wrapper>
      <div>
        <Typography size="24px">결제예상금액</Typography>
      </div>
      <div>
        <ProductPrice size="20px">총 상품 가격</ProductPrice>
        <ProductPrice size="20px">{`${getTotalProductPrice.toLocaleString(
          'ko-KR'
        )} 원`}</ProductPrice>
      </div>
      <div>
        <ShippingPrice size="20px">배송비</ShippingPrice>
        <ShippingPrice size="20px">{`${
          getTotalProductPrice > 0 ? shippingPrice.toLocaleString('ko-KR') : 0
        } 원`}</ShippingPrice>
      </div>
      <div>
        <TotalPrice size="20px">총 주문금액</TotalPrice>
        <TotalPrice size="20px">{`${
          getTotalProductPrice > 0
            ? (getTotalProductPrice + shippingPrice).toLocaleString('ko-KR')
            : 0
        } 원`}</TotalPrice>
      </div>
      <Styled.OrderButton width="388px" height="72px">
        주문하기
      </Styled.OrderButton>
    </Styled.Wrapper>
  );
};
