import { useRecoilValue } from "recoil";

import { CartResultsContainerStyle } from "./CartResults.style";

import { SHIPPING_CONSTANT } from "@/constants";
import { orderAmountState } from "@/store/selector/selectors";
import { cartState } from "@/store/atom/atoms";

import PaymentDetail from "@/components/PaymentDetail/PaymentDetail";
import Divider from "@/components/Divider/Divider";
import { PropsWithChildren } from "react";
import InformationCircleDescription from "@/components/InformationCircleDescription/InformationCircleDescription";

const CartResults = ({ children }: PropsWithChildren) => {
  const orderAmount = useRecoilValue(orderAmountState);
  const itemCount = useRecoilValue(cartState).length;

  return (
    <div css={CartResultsContainerStyle}>
      {itemCount !== 0 && (
        <>
          <InformationCircleDescription>
            총 주문 금액이 {SHIPPING_CONSTANT.FREE_CRITERIA.toLocaleString()} 원 이상일 경우 무료 배송됩니다.
          </InformationCircleDescription>
          <Divider />
          <PaymentDetail title="주문 금액" amount={orderAmount} />
          {children}
        </>
      )}
    </div>
  );
};

export default CartResults;
