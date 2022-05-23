import styled from "styled-components";
import { spaceBetween } from "../../styles/mixin";

const PaymentContainer = styled.div`
  margin-top: 80px;
  height: 200px;
`;

const PaymentTitle = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  padding: 15px;
`;

const PaymentResultContainer = styled.div`
  ${spaceBetween};
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  height: 100px;
  padding: 15px;

  div {
    ${spaceBetween};
  }

  span {
    background: linear-gradient(to top, #99f6e4 50%, white 50%);
  }
`;

export { PaymentContainer, PaymentTitle, PaymentResultContainer };
