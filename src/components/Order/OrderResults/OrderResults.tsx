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
import { totalAmountSelector } from "../../../store/selector/selectors";

const OrderResults = () => {
  const totalAmount = useRecoilValue(totalAmountSelector);

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
      <PaymentDetail title="쿠폰 할인 금액" amount={-2} />
      <PaymentDetail title="배송비" amount={3} />
      <Divider />
      <PaymentDetail title="총 결제 금액" amount={4} />
    </div>
  );
};

export default OrderResults;
