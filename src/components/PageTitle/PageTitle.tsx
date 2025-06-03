import { PageTitleStyle } from './PageTitle.styles';

function PageTitle({ children }: { children: React.ReactNode }) {
  return <section css={PageTitleStyle}>{children}</section>;
}

export default PageTitle;
