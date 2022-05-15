import styled from "styled-components";

const ExpectedPaymentTopContainer = styled.div`
  padding: 20px;
  font-size: 16px;
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme }) => theme.colors["gray_04"]};
`;

export default ExpectedPaymentTopContainer;
