import styled from "styled-components";
import { COLOR } from "../../constants/theme";
import { FlexBetween } from "../../SharedStyled/Flex";

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 3.75rem 1.5rem 0 1.5rem;
`;

const PaymentInfo = styled.div`
  width: 100%;
  max-width: 31rem;
  float: right;
`;

const PaymentInfoTitle = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 3;
  border-bottom: 1px solid ${COLOR.GRAY_150};
`;

const PaymentInfoContent = styled(FlexBetween("div"))`
  align-items: center;
  height: 11rem;
`;

export { Container, PaymentInfo, PaymentInfoTitle, PaymentInfoContent };
