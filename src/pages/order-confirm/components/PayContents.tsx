import styled from "@emotion/styled";
import CouponModalButton from "../../../domain/order/components/pay-contents/CouponModalButton";
import DeliveryInfo from "../../../domain/order/components/pay-contents/DeliveryInfo";
import PayButton from "../../../domain/order/components/pay-contents/PayButton";
import { Flex } from "../../../components/common";

function PayContents() {
  return (
    <>
      <Container justifyContent="flex-start">
        <CouponModalButton />
        <DeliveryInfo />
      </Container>
      <PayButton />
    </>
  );
}

export default PayContents;

const Container = styled(Flex)`
  padding: 0 24px;
`;
