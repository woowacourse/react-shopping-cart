/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { OrderConfirmFooterStyle } from "./OrderConfirmFooter.style";

const OrderConfirmFooter = () => {
  const navigate = useNavigate();

  const isDisabled = true;

  return (
    <button disabled={isDisabled} css={OrderConfirmFooterStyle} onClick={() => navigate(0)}>
      결제하기
    </button>
  );
};

export default OrderConfirmFooter;
