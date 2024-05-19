import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { totalItemLengthSelector } from "@/recoil/orderInformation";

import useSelectAll from "@/hooks/useSelectAll";

import Header from "@/components/_common/Header/Header";
import Caption from "@/components/_common/Caption/Caption";
import CheckBox from "@/components/_common/CheckBox/CheckBox";
import TitleSet from "@/components/_common/TitleSet/TitleSet";

import OrderConfirmButton from "@/components/OrderConfirmButton/OrderConfirmButton";
import PriceSection from "@/components/PriceSection/PriceSection";

import MoreInfo from "@/assets/more-info.svg?react";

import { PAGE_URL } from "@/constants/url";

import Styled from "./CartPage.style";

const ProductList = React.lazy(
  () => import("../../components/ProductList/ProductList")
);

const CartPage = () => {
  const navigate = useNavigate();
  const routerToOrderConfirmPage = () => {
    navigate(PAGE_URL.orderConfirm);
  };

  const totalItemLength = useRecoilValue(totalItemLengthSelector);
  const { isAllItemSelected, selectAllItem, unselectAllItem } = useSelectAll();

  const isEmptyCart = totalItemLength === 0;

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

            <Styled.CheckBoxWrapper>
              <CheckBox
                isChecked={isAllItemSelected}
                onClick={isAllItemSelected ? unselectAllItem : selectAllItem}
              />
              <Caption text="전체선택" />
            </Styled.CheckBoxWrapper>

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

      <OrderConfirmButton
        onClick={routerToOrderConfirmPage}
        disabled={isEmptyCart}
      />
    </>
  );
};

export default CartPage;
