import styled from "styled-components";

const PaymentPageHeader = styled.div`
  width: 880px;
  padding: 20px 0;
  border-bottom: 3px solid;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  border-bottom-color: ${({ theme }) => theme.colors["black_03"]};
`;

export default PaymentPageHeader;
