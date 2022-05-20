import * as Styled from './PageTemplate.style';
import Header from '../Header/Header';
import { EmptyObject } from 'redux';

function PageTemplate({ children }: React.PropsWithChildren<EmptyObject>) {
  return (
    <>
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </>
  );
}

export default PageTemplate;
