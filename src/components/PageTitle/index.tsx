import * as S from './style';

type PageTitleProps = {
  children: string;
};

function PageTitle({ children }: PageTitleProps) {
  return <S.Container>{children}</S.Container>;
}

export default PageTitle;
