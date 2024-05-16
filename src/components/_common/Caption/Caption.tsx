import styled from "styled-components";

interface CaptionProps {
  asset?: () => JSX.Element;
  text: string;
}

const Caption = ({ asset, text }: CaptionProps) => {
  return (
    <CaptionText>
      {asset && asset()}
      {text}
    </CaptionText>
  );
};

export default Caption;

const CaptionText = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  ${({ theme }) => theme.TEXT.Subtitle}
`;
