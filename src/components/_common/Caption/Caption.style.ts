import styled from "styled-components";

const CaptionText = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  ${({ theme }) => theme.TEXT.Subtitle}
`;

const Styled = {
  CaptionText,
};

export default Styled;
