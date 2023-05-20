import styled from "styled-components";

export const PurchaseWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.secondary};
  padding: 30px;
`;

export const PurchaseTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;

  letter-spacing: 0.5px;
`;

export const PurchaseText = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;

  letter-spacing: 0.5px;
`;

export const PurchasePropertyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
