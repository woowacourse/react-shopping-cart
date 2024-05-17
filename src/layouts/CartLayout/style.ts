import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 176px);
  padding: 24px;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 35px;
`;
