/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { OrderFooterStyle } from "./OrderFooter.style";

const OrderFooter = () => {
  const navigate = useNavigate();

  const isDisabled = false;

  return (
    <button disabled={isDisabled} css={OrderFooterStyle} onClick={() => navigate(0)}>
      결제하기
    </button>
  );
};

export default OrderFooter;
