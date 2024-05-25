/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { OrderFooterStyle } from "./OrderFooter.style";

const OrderFooter = () => {
  const navigate = useNavigate();

  return (
    <button disabled={false} css={OrderFooterStyle} onClick={() => navigate("/payment")}>
      결제하기
    </button>
  );
};

export default OrderFooter;
