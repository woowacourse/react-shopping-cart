import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const PriceGroup = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const PriceTitle = styled.div`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: 16px;
`;

export const PriceNumber = styled.div`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: 35px;
`;
