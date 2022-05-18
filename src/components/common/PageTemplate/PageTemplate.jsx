import * as Styled from './PageTemplate.style';
import Header from '../Header/Header';

function PageTemplate({ children }) {
  return (
    <div className="app">
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </div>
  );
}

export default PageTemplate;
