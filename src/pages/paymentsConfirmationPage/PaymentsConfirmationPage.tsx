import { useNavigate } from "react-router-dom";
import { CartLayout } from "../../components/cartLayout/CartLayout";
import { PaymentsSummary } from "../../components/paymentsSummary/PaymentsSummary";
import { BUTTON_COLORS, HEADER_TYPES, PATHS } from "../../constants";

export const PaymentsConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const navigateToCartPage = () => {
    navigate(PATHS.BASE);
  };

  return (
    <CartLayout
      headerType={HEADER_TYPES.NONE}
      buttonText="장바구니로 돌아가기"
      buttonMode={BUTTON_COLORS.DARK}
      onButtonClick={navigateToCartPage}
    >
      <PaymentsSummary />
    </CartLayout>
  );
};
