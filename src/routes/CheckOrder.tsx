import RouteInfoProvider from "@/Providers/RouteInfoProvider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CartTitle from "@/components/Main/Cart/CartTitle/CartTitle";
import Main from "@/components/Main/Main";

const CheckOrder = () => {
  return (
    <RouteInfoProvider>
      <Header />
      <Main>
        <CartTitle>주문 확인</CartTitle>
      </Main>
      <Footer />
    </RouteInfoProvider>
  );
};

export default CheckOrder;
