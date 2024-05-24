import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { cartState, isExtraShippingFeeState } from "@/store/atom/atoms";

import useCustomContext from "@/hooks/useCustomContext";

import CartDescription from "@/components/Main/Cart/CartDescription/CartDescription";
import { MainRouteInfoContext, RoutePaths } from "@/Providers/RouteInfoProvider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CartTitle from "@/components/Main/Cart/CartTitle/CartTitle";
import Main from "@/components/Main/Main";
import CartItemContainer from "@/components/Main/Cart/CartItemContainer/CartItemContainer";
import CartItemCheckedList from "@/components/Main/Cart/CartItemContainer/CartItemCheckedList/CartItemCheckedList";
import Button from "@/components/Button/Button";
import ToolBar from "@/components/ToolBar/ToolBar";
import CartResults from "@/components/Main/Cart/CartResults/CartResults";

const CheckOrder = () => {
  const itemCount = useRecoilValue(cartState).length;

  const location = useLocation();
  const pathname = location.pathname as RoutePaths;
  const MainInfo = useCustomContext(MainRouteInfoContext)[pathname];

  const [isDoSeoSanGan, setIsDoSeoSanGan] = useRecoilState(isExtraShippingFeeState);
  const handleToolbarCheck = () => {
    setIsDoSeoSanGan((prev) => !prev);
  };

  const handleCouponButtonClick = () => {
    //TODO: 모달을 연다.
  };

  return (
    <>
      <Header />
      <Main>
        <div>
          <CartTitle>주문 확인</CartTitle>
          {itemCount !== 0 && <CartDescription>현재 {itemCount}종류의 상품이 담겨 있습니다.</CartDescription>}
          {MainInfo.cartDescription && <CartDescription>{MainInfo.cartDescription}</CartDescription>}
        </div>
        <CartItemContainer>
          <CartItemCheckedList />
        </CartItemContainer>
        <Button width="100%" height="48px" fontSize="15px" onClick={handleCouponButtonClick}>
          쿠폰 적용
        </Button>
        <ToolBar handleCheck={handleToolbarCheck} isCheck={isDoSeoSanGan}>
          제주도 및 도서 산간 지역
        </ToolBar>
        <CartResults isShowCouponDiscount={true} />
      </Main>
      <Footer />
    </>
  );
};

export default CheckOrder;
