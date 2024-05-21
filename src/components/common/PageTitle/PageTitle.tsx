import * as Styled from './PageTitle.style';

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return <Styled.PageTitle>{title}</Styled.PageTitle>;
}
