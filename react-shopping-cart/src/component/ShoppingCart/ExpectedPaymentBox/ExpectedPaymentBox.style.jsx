import styled from "styled-components";

export const ExpectedPaymentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ExpectedPaymentText = styled.div`
  font-weight: 700;
  font-size: 13px;
  text-decoration-style: solid;
  text-decoration-line: underline;
  text-decoration-color: ${({ theme }) => theme.colors["opacity_cyon"]};
  text-decoration-thickness: 3px;
`;
