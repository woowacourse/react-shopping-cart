import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 56px;
`;

export const Title = styled.div`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
