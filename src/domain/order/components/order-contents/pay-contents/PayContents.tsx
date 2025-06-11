import styled from "@emotion/styled";
import { Flex } from "../../../../../components/common";
import CouponModalButton from "./CouponModalButton";
import DeliveryInfo from "./DeliveryInfo";
import PayButton from "./PayButton";

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
