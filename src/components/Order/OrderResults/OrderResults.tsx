/** @jsxImportSource @emotion/react */
import { IoIosInformationCircleOutline } from "react-icons/io";
import Divider from "../../common/Divider/Divider";
import PaymentDetail from "../../common/PaymentDetail/PaymentDetail";
import { SHIPPING_CONSTANT } from "../../../constants";
import {
  OrderResultGuideContainerStyle,
  OrderResultGuideStyle,
  OrderResultsContainerStyle,
} from "./OrderResults.style";
import { useRecoilValue } from "recoil";
import { orderAmountSelector, shippingFeeSelector } from "../../../store/selector/selectors";
import { useDiscountCalculator } from "../../../hooks/useDiscountCalculator";
import { selectedCouponsState } from "../../../store/atom/atoms";
import { useCartCalculator } from "../../../hooks/useCartCalculator";

const OrderResults = () => {
  const orderAmount = useRecoilValue(orderAmountSelector);
  const selectedCouponList = useRecoilValue(selectedCouponsState);
  const shippingFee = useRecoilValue(shippingFeeSelector);

  const { calculateTotalWithCoupon } = useCartCalculator();
  const { calculateTotalDiscountAmount } = useDiscountCalculator();
  const totalDiscountAmount = calculateTotalDiscountAmount(selectedCouponList);

  return (
    <div css={OrderResultsContainerStyle}>
      <div css={OrderResultGuideContainerStyle}>
        <IoIosInformationCircleOutline size={15} />
        <div css={OrderResultGuideStyle}>
          총 주문 금액이 {SHIPPING_CONSTANT.FREE_CRITERIA.toLocaleString() + "원"} 이상일 경우 무료 배송됩니다.
        </div>
      </div>

      <Divider />
      <PaymentDetail title="주문 금액" amount={orderAmount} />
      <PaymentDetail title="쿠폰 할인 금액" amount={totalDiscountAmount === 0 ? 0 : -totalDiscountAmount} />
      <PaymentDetail
        title="배송비"
        amount={selectedCouponList.some((coupon) => coupon.discountType === "freeShipping") ? "무료배송" : shippingFee}
      />
      <Divider />
      <PaymentDetail title="총 결제 금액" amount={calculateTotalWithCoupon()} />
    </div>
  );
};

export default OrderResults;
