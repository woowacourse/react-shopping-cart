import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100% - 176px);
  overflow-y: auto;
  padding: 24px;
`;

export const Title = styled.div`
  padding: 5px 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: 35px;
`;
