import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 64px;

  display: flex;
  flex-direction: column;

  row-gap: 12px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.TEXT.xLarge}
`;

export const SubTitle = styled.div`
  ${({ theme }) => theme.TEXT.xSmall}
`;
