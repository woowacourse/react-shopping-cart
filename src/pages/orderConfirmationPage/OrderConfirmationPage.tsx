import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CartLayout } from "../../components/cartLayout/CartLayout";
import { ContentHeader } from "../../components/contentHeader/ContentHeader";
import { BUTTON_COLORS, CART, HEADER_TYPES, PATHS } from "../../constants";
import { cartSummarySelectorState } from "../../recoil/selector/selector";

export const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const navigateToPaymentsConfirmationPage = () => {
    navigate(PATHS.PAYMENTS_CONFIRMATION);
  };

  const { uniqueItemCount, totalItemCount } = useRecoilValue(cartSummarySelectorState);

  const buttonMode =
    uniqueItemCount === CART.EMPTY_THRESHOLD ? BUTTON_COLORS.LIGHT : BUTTON_COLORS.DARK;

  const description = `총 ${uniqueItemCount}종류의 상품 ${totalItemCount}개를 주문합니다. \n최종 결제 금액을 확인해 주세요.`;

  return (
    <CartLayout
      headerType={HEADER_TYPES.BACK}
      buttonText="결제하기"
      buttonMode={buttonMode}
      onButtonClick={navigateToPaymentsConfirmationPage}
    >
      <ContentHeader title="주문 확인" description={description} />
    </CartLayout>
  );
};
