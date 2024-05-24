import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { cartState } from "@/store/atom/atoms";

import CartDescription from "@/components/Main/Cart/CartDescription/CartDescription";
import RouteInfoProvider, { MainRouteInfoContext, RoutePaths } from "@/Providers/RouteInfoProvider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CartTitle from "@/components/Main/Cart/CartTitle/CartTitle";
import Main from "@/components/Main/Main";

import useCustomContext from "@/hooks/useCustomContext";

const CheckOrder = () => {
  const itemCount = useRecoilValue(cartState).length;

  const location = useLocation();
  const pathname = location.pathname as RoutePaths;
  const MainInfo = useCustomContext(MainRouteInfoContext)[pathname];

  return (
    <RouteInfoProvider>
      <Header />
      <Main>
        <div>
          <CartTitle>주문 확인</CartTitle>
          {itemCount !== 0 && <CartDescription>현재 {itemCount}종류의 상품이 담겨 있습니다.</CartDescription>}
          {MainInfo.cartDescription && <CartDescription>{MainInfo.cartDescription}</CartDescription>}
        </div>
      </Main>
      <Footer />
    </RouteInfoProvider>
  );
};

export default CheckOrder;
