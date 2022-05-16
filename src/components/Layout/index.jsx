import Header from './Header';
import Footer from './Footer';

import * as Styled from './styles';

function Layout({ children }) {
  return (
    <Styled.Container>
      <Header />
      <Styled.Content>{children}</Styled.Content>
      <Footer />
    </Styled.Container>
  );
}

export default Layout;
