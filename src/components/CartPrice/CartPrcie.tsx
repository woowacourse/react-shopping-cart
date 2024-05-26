import { useRecoilValue } from "recoil";
import {
  orderPriceState,
  deliveryFeeState,
  couponDiscountPriceState,
  paymentPriceState,
} from "../../recoil/selectors/selectors";
import { Wrapper, Price } from "./style";
import { Text } from "../common";
import { useLocation } from "react-router-dom";

export interface PriceStyleProps {
  $borderTop?: string;
}

const CartPrice = () => {
  const location = useLocation();
  const orderPrice = useRecoilValue(orderPriceState);
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const couponDiscountPrice = useRecoilValue(couponDiscountPriceState);
  const paymentPrice = useRecoilValue(paymentPriceState);

  return (
    <Wrapper>
      <Price>
        <Text size="medium">주문 금액</Text>
        <Text size="large">{orderPrice.toLocaleString("ko-KR")}원</Text>
      </Price>
      {location.pathname === "/order" && (
        <Price>
          <Text size="medium">쿠폰 할인 금액</Text>
          <Text size="large">
            {(-couponDiscountPrice || couponDiscountPrice).toLocaleString("ko-KR")}원
          </Text>
        </Price>
      )}
      <Price>
        <Text size="medium">배송비</Text>
        <Text size="large">{deliveryFee.toLocaleString("ko-KR")}원</Text>
      </Price>
      <Price>
        <Text size="medium">총 결제 금액</Text>
        <Text size="large">{paymentPrice.toLocaleString("ko-KR")}원</Text>
      </Price>
    </Wrapper>
  );
};

export default CartPrice;
