import { useRecoilValue } from "recoil";

import { CartResultsContainerStyle } from "./CartResults.style";

import { SHIPPING_CONSTANT } from "@/constants";
import { orderAmountState, totalAmountState } from "@/store/selector/selectors";
import { cartState } from "@/store/atom/atoms";

import PaymentDetail from "@/components/PaymentDetail/PaymentDetail";
import Divider from "@/components/Divider/Divider";
import { PropsWithChildren } from "react";
import InformationCircleDescription from "@/components/InformationCircleDescription/InformationCircleDescription";

interface CartResultsProps extends PropsWithChildren {
  isShowCouponDiscount?: boolean;
}

const CartResults = ({ isShowCouponDiscount = false }: CartResultsProps) => {
  const orderAmount = useRecoilValue(orderAmountState);
  const totalAmount = useRecoilValue(totalAmountState);
  const itemCount = useRecoilValue(cartState).length;

  //TODO: 쿠폰 할인율 적용.

  return (
    <div css={CartResultsContainerStyle}>
      {itemCount !== 0 && (
        <>
          <InformationCircleDescription>
            총 주문 금액이 {SHIPPING_CONSTANT.FREE_CRITERIA.toLocaleString() + "원"} 이상일 경우 무료 배송됩니다.
          </InformationCircleDescription>

          <Divider />
          <PaymentDetail title="주문 금액" amount={orderAmount} />
          {isShowCouponDiscount && <PaymentDetail title="쿠폰 할인 금액" amount={1} />}
          <PaymentDetail
            title="배송비"
            amount={orderAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? 0 : SHIPPING_CONSTANT.FEE}
          />
          <Divider />
          <PaymentDetail title="총 결제 금액" amount={totalAmount} />
        </>
      )}
    </div>
  );
};

export default CartResults;
