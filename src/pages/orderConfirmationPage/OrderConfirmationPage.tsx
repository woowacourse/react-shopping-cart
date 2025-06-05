import {
  Title,
  Subtitle,
  TitleContainer,
} from "../../styles/@common/title/Title.styles";
import { ORDER_CONFIRMATION_MESSAGE } from "../../constants/systemMessages";
import { useLocation } from "react-router-dom";
// import * as S from "./OrderConfirmationPage.styles";

const OrderConfirmationPage = () => {
  const { orderItems, orderPrice, deliveryFee, totalPrice } =
    useLocation().state;

  return (
    <div css={TitleContainer}>
      <p css={Title}>주문 확정</p>
      <p css={Subtitle}>{ORDER_CONFIRMATION_MESSAGE(1, 2)}</p>
    </div>
  );
};

export default OrderConfirmationPage;
