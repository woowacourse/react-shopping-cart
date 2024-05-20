import Styled from "./TitleSet.style";

interface TitleSetProps {
  title: string;
  subTitle?: string;
}

const TitleSet = ({ title, subTitle }: TitleSetProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      {subTitle && <Styled.SubTitle>{subTitle}</Styled.SubTitle>}
    </Styled.Wrapper>
  );
};

export default TitleSet;
