import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 100%;
  height: calc(100vh - 112px);
  padding: 24px;
  text-align: center;
`;

export const Title = styled.div`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-extra-bold);
`;

export const ErrorContent = styled.div`
  font-size: var(--font-size-base);
  line-height: 16px;
`;
