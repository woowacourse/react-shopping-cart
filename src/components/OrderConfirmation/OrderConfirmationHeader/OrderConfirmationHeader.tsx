import goBack from "/goBack.svg";
import * as Styled from "./OrderConfirmationHeader.style";
import Header from "../../common/Header/Header";

function OrderConfirmationHeader({
  handleGoBackToHomeButton,
}: {
  handleGoBackToHomeButton: () => void;
}) {
  return (
    <Header>
      <Styled.GoBackButton onClick={handleGoBackToHomeButton}>
        <Styled.GoBackIcon src={goBack} alt="Go back" />
      </Styled.GoBackButton>
    </Header>
  );
}

export default OrderConfirmationHeader;
