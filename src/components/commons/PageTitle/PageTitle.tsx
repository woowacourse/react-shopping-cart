import * as Styled from './PageTitle.styles';

export interface Props {
  children: React.ReactNode;
}

const PageTitle = ({ children }: Props) => {
  return (
    <Styled.PageTitle>
      <Styled.Title>{children}</Styled.Title>
    </Styled.PageTitle>
  );
};

export default PageTitle;
