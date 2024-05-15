/** @jsxImportSource @emotion/react */
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CartResultGuideStyle, CartResultGuideContainerStyle, CartResultsContainerStyle } from "./CartResults.style";
import PaymentDetail from "../../../PaymentDetail/PaymentDetail";
import Divider from "../../../Divider/Divider";

const CartResults = () => {
  return (
    <div css={CartResultsContainerStyle}>
      <div css={CartResultGuideContainerStyle}>
        <IoIosInformationCircleOutline size={15} />
        <div css={CartResultGuideStyle}>총 주문 금액이 십만 이상일 경우 무료 배송됩니다.</div>
      </div>

      <Divider />
      <PaymentDetail title="주문 금액" amount={60_000} />
      <PaymentDetail title="배송비" amount={60_000} />
      <Divider />
      <PaymentDetail title="총 결제 금액" amount={60_000} />
    </div>
  );
};

export default CartResults;
