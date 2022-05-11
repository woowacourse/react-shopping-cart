import * as Styled from './PageTemplate.style';
import Header from '../Header/Header';

export default function PageTemplate({ children }) {
  return (
    <>
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </>
  );
}
