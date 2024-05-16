import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { totalItemLengthSelector } from "@/recoil/orderInformation";

import useSelectAll from "@/hooks/useSelectAll";

import Caption from "@/components/_common/Caption/Caption";
import CheckBox from "@/components/_common/CheckBox/CheckBox";
import TitleSet from "@/components/_common/TitleSet/TitleSet";
import Button from "@/components/_common/Button/Button";

import Header from "@/components/layout/Header/Header";

import PriceSection from "@/components/PriceSection/PriceSection";
import MoreInfo from "@/assets/more-info.svg?react";
import CartEmpty from "@/components/CartEmpty/CartEmpty";

import { PAGE_URL } from "@/constants/url";

import * as S from "./CartPage.style";

const ProductList = React.lazy(
  () => import("../../components/ProductList/ProductList")
);

const CartPage = () => {
  const totalItemLength = useRecoilValue(totalItemLengthSelector);
  const { isAllItemSelected, selectAllItem, unselectAllItem } = useSelectAll();

  const navigate = useNavigate();

  const onMoveOrderConfirmPage = () => {
    navigate(PAGE_URL.orderConfirm);
  };

  return (
    <>
      <Header>
        <S.CartHeaderTitle>SHOP</S.CartHeaderTitle>
      </Header>
      {totalItemLength ? (
        <>
          <S.CartPageLayout>
            <TitleSet
              title="장바구니"
              subTitle={`현재 ${totalItemLength}종류의 상품이 담겨있습니다.`}
            />

            <S.CheckBoxWrapper>
              <CheckBox
                isChecked={isAllItemSelected}
                onClick={isAllItemSelected ? unselectAllItem : selectAllItem}
              />
              <Caption text="전체선택" />
            </S.CheckBoxWrapper>

            <Suspense fallback={<div>loading....</div>}>
              <ProductList />
            </Suspense>

            <Caption
              asset={() => <MoreInfo />}
              text="총 주문 금액이 100,00원 이상일 경우 무료 배송됩니다."
            />

            <PriceSection />
          </S.CartPageLayout>
          <S.OrderConfirmButton onClick={onMoveOrderConfirmPage}>
            <Button width="full" size="xLarge" theme="dark">
              <S.ButtonText>주문 확인</S.ButtonText>
            </Button>
          </S.OrderConfirmButton>
        </>
      ) : (
        <>
          <S.CartPageLayout>
            <TitleSet title="장바구니" />
            <CartEmpty />
          </S.CartPageLayout>
        </>
      )}
    </>
  );
};

export default CartPage;
