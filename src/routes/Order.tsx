import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import OrderContainer from "../components/Main/Order/OrderContainer";

const Order = () => {
  return (
    <>
      <Header />
      <Main>
        <OrderContainer />
      </Main>
      <Footer />
    </>
  );
};

export default Order;
