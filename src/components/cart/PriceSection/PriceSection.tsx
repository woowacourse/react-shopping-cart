import { useRecoilValue } from "recoil";

import PriceInfoBox from "../PriceInfoBox/PriceInfoBox.tsx";

import * as S from "./PriceSection.styles.ts";

import { totalItemsPriceSelector } from "@/recoil/orderInformation.ts";
import { SHIPPING_FEE } from "@/constants/shippingInfo.ts";
import { shippingFeeSelector } from "@/recoil/shippingFeeType.ts";
import { couponsState } from "@/recoil/coupons.ts";
import useDiscountCalculator from "@/hooks/coupon/useDiscountCalculator.ts";

interface Props {
  isApplyCoupon: boolean;
}

const PriceSection = ({ isApplyCoupon }: Props) => {
  const { calculateTotalDiscount } = useDiscountCalculator();

  const coupons = useRecoilValue(couponsState);
  const orderPrice = useRecoilValue(totalItemsPriceSelector);
  const shippingFeeType = useRecoilValue(shippingFeeSelector);
  const totalDiscountAmount = calculateTotalDiscount(coupons, orderPrice);

  const finalOrderPrice =
    orderPrice - totalDiscountAmount + SHIPPING_FEE[shippingFeeType];

  return (
    <S.Wrapper>
      <S.BorderLine />

      <PriceInfoBox priceLabel="주문 금액" price={orderPrice} />
      {isApplyCoupon && (
        <PriceInfoBox
          priceLabel="쿠폰 할인 금액 금액"
          price={totalDiscountAmount}
        />
      )}
      <PriceInfoBox priceLabel="배송비" price={SHIPPING_FEE[shippingFeeType]} />

      <S.BorderLine />

      <PriceInfoBox priceLabel="총 결제 금액" price={finalOrderPrice} />
    </S.Wrapper>
  );
};

export default PriceSection;
