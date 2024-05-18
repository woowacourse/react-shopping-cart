import * as S from "./TitleSet.style";

interface TitleSetProps {
  title: string;
  subTitle?: string;
}

const TitleSet = ({ title, subTitle }: TitleSetProps) => {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
    </S.Wrapper>
  );
};

export default TitleSet;
