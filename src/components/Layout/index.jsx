import Header from 'components/@common/Header';
import Footer from 'components/@common/Footer';

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="container">{children}</div>
    <Footer />
  </>
);

export default Layout;
