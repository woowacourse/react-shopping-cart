import styled from "styled-components";

export const Container = styled.section`
  & > :nth-child(3) {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
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
