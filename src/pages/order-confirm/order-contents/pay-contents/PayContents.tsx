import styled from "@emotion/styled";
import { Flex } from "../../../../components/common";
import { useNavigate } from "react-router-dom";
import CouponModalButton from "./CouponModalButton";
import DeliveryInfo from "./DeliveryInfo";

function PayContents() {
  const navigate = useNavigate();
  const navigateToSuccessPage = () => {
    navigate("/success-confirm");
  };
  return (
    <>
      <Container justifyContent="flex-start">
        <CouponModalButton />
        <DeliveryInfo />
      </Container>
      <PayButton onClick={navigateToSuccessPage} isDisabled={false}>
        결제하기
      </PayButton>
    </>
  );
}

export default PayContents;

const Container = styled(Flex)`
  padding: 0 24px;
`;

const PayButton = styled.button<{ isDisabled: boolean }>`
  /* position: sticky;
  bottom: 0; */
  width: 100%;
  padding: 16px;
  background-color: ${({ isDisabled }) => (isDisabled ? "#BDBDBD" : "#333")};
  color: white;
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  border-radius: 0px;
`;
