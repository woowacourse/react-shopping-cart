import * as S from './TitleContainer.style';

interface TitleContainerProps {
  title: string;
  subTitle?: string;
}

export const SubTitle = ({ children }: React.PropsWithChildren) => {
  return <S.SubTitle>{children}</S.SubTitle>;
};

const TitleContainer = ({ title, subTitle, children }: React.PropsWithChildren<TitleContainerProps>) => {
  return (
    <S.TitleContainer>
      <S.Title>{title}</S.Title>
      {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
      {children}
    </S.TitleContainer>
  );
};

export default TitleContainer;
