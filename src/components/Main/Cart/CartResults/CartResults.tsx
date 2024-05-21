import { IoIosInformationCircleOutline } from "react-icons/io";
import { useRecoilValue } from "recoil";

import { CartResultGuideStyle, CartResultGuideContainerStyle, CartResultsContainerStyle } from "./CartResults.style";

import { SHIPPING_CONSTANT } from "@/constants";
import { orderAmountState, totalAmountState } from "@/store/selector/selectors";
import { cartState } from "@/store/atom/atoms";

import PaymentDetail from "@/components/PaymentDetail/PaymentDetail";
import Divider from "@/components/Divider/Divider";

const CartResults = () => {
  const orderAmount = useRecoilValue(orderAmountState);
  const totalAmount = useRecoilValue(totalAmountState);
  const itemCount = useRecoilValue(cartState).length;

  return (
    <div css={CartResultsContainerStyle}>
      {itemCount !== 0 && (
        <>
          <div css={CartResultGuideContainerStyle}>
            <IoIosInformationCircleOutline size={15} />
            <div css={CartResultGuideStyle}>
              총 주문 금액이 {SHIPPING_CONSTANT.FREE_CRITERIA.toLocaleString() + "원"} 이상일 경우 무료 배송됩니다.
            </div>
          </div>

          <Divider />
          <PaymentDetail title="주문 금액" amount={orderAmount} />
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
