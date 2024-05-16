import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 64px;

  display: flex;
  flex-direction: column;

  row-gap: 12px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.TEXT.Title}
`;

const SubTitle = styled.div`
  ${({ theme }) => theme.TEXT.Subtitle}
`;

export const S = {
  Wrapper,
  Title,
  SubTitle,
};
