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
import { shippingFeeSelector, totalAmountSelector } from "../../../store/selector/selectors";
import { useDiscountCalculator } from "../../../hooks/useDiscountCalculator";
import { selectedCouponsState } from "../../../store/atom/atoms";

const OrderResults = () => {
  const totalAmount = useRecoilValue(totalAmountSelector);
  const couponList = useRecoilValue(selectedCouponsState);
  const shippingFee = useRecoilValue(shippingFeeSelector);

  const { calculateTotalDiscountAmount } = useDiscountCalculator();
  const totalDiscountAmount = calculateTotalDiscountAmount(couponList);

  return (
    <div css={OrderResultsContainerStyle}>
      <div css={OrderResultGuideContainerStyle}>
        <IoIosInformationCircleOutline size={15} />
        <div css={OrderResultGuideStyle}>
          총 주문 금액이 {SHIPPING_CONSTANT.FREE_CRITERIA.toLocaleString() + "원"} 이상일 경우 무료 배송됩니다.
        </div>
      </div>

      <Divider />
      <PaymentDetail title="주문 금액" amount={totalAmount} />
      <PaymentDetail title="쿠폰 할인 금액" amount={totalDiscountAmount} />
      <PaymentDetail title="배송비" amount={shippingFee} />
      <Divider />
      <PaymentDetail title="총 결제 금액" amount={4} />
    </div>
  );
};

export default OrderResults;
