import styled from "styled-components";

export const PriceSection = styled.div`
  min-height: 170px;
  margin-top: 20px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const BorderLine = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.COLOR.grey};
`;
