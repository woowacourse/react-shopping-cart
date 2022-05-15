import Header from './Header';
import Footer from './Footer';

import * as Styled from './styles';

function Layout({ children }) {
  return (
    <Styled.Container>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </Styled.Container>
  );
}

export default Layout;
