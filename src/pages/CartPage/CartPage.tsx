import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { totalItemLengthSelector } from "@/recoil/orderInformation";
import { selectedCartItemLengthSelector } from "@/recoil/selectedCardItems";

import Header from "@/components/_common/Header/Header";
import Caption from "@/components/_common/Caption/Caption";

import TitleSet from "@/components/_common/TitleSet/TitleSet";

import BottomFixedButton from "@/components/BottomFixedButton/BottomFixedButton";
import PriceSection from "./components/PriceSection";
import CartItemAllSelector from "./components/CartItemAllSelector";

import MoreInfo from "@/assets/more-info.svg?react";

import Styled from "./CartPage.style";
import CLIENT_PATH from "@/constants/path";

const ProductList = React.lazy(
  () => import("../../components/ProductList/ProductList")
);

const CartPage = () => {
  const totalItemLength = useRecoilValue(totalItemLengthSelector);
  const selectedCartItemLength = useRecoilValue(selectedCartItemLengthSelector);

  const navigate = useNavigate();
  const routerToOrderConfirmPage = () => {
    navigate(CLIENT_PATH.orderConfirm);
  };

  const isEmptyCart = totalItemLength === 0;
  const hasSelectedCartItem = selectedCartItemLength === 0;

  return (
    <>
      <Header>
        <Styled.CartHeaderTitle>SHOP</Styled.CartHeaderTitle>
      </Header>

      <Styled.CartPageLayout>
        {!isEmptyCart ? (
          <>
            <TitleSet
              title="장바구니"
              subTitle={`현재 ${totalItemLength}종류의 상품이 담겨있습니다.`}
            />
            <CartItemAllSelector />

            <Suspense fallback={<div>loading....</div>}>
              <ProductList />
            </Suspense>

            <Caption
              asset={() => <MoreInfo />}
              text="총 주문 금액이 100,00원 이상일 경우 무료 배송됩니다."
            />
            <PriceSection />
          </>
        ) : (
          <>
            <TitleSet title="장바구니" />
            <Styled.EmptyCartWrapper>
              <Caption text="장바구니에 담은 상품이 없습니다."></Caption>
            </Styled.EmptyCartWrapper>
          </>
        )}
      </Styled.CartPageLayout>

      <BottomFixedButton
        buttonText="주문 확인"
        onClick={routerToOrderConfirmPage}
        disabled={hasSelectedCartItem}
      />
    </>
  );
};

export default CartPage;
