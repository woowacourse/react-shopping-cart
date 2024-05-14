import * as Styled from './style';

interface TitleProp {
  title: string;
  caption: string;
}

const Title = ({ title, caption }: TitleProp) => {
  return (
    <Styled.TitleContainer>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Caption>{caption}</Styled.Caption>
    </Styled.TitleContainer>
  );
};

export default Title;
