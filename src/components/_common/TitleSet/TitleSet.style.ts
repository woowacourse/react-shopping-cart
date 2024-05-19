import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

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

const Styled = {
  Wrapper,
  Title,
  SubTitle,
};

export default Styled;
