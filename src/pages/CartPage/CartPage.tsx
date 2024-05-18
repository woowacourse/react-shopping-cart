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
import { MESSAGES, TITLES } from "@/constants/cart";

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
        <S.CartHeaderTitle>{TITLES.shop}</S.CartHeaderTitle>
      </Header>
      {totalItemLength ? (
        <>
          <S.CartPageLayout>
            <TitleSet
              title={TITLES.cart}
              subTitle={MESSAGES.itemCount(totalItemLength)}
            />

            <S.CheckBoxWrapper>
              <CheckBox
                isChecked={isAllItemSelected}
                onClick={isAllItemSelected ? unselectAllItem : selectAllItem}
              />
              <Caption text={TITLES.selectAll} />
            </S.CheckBoxWrapper>

            <Suspense fallback={<div>loading....</div>}>
              <ProductList />
            </Suspense>

            <Caption
              asset={() => <MoreInfo />}
              text={MESSAGES.freeShippingInfo}
            />

            <PriceSection />
          </S.CartPageLayout>
          <S.OrderConfirmButton onClick={onMoveOrderConfirmPage}>
            <Button width="full" size="xLarge" theme="dark">
              <S.ButtonText>{TITLES.orderConfirm}</S.ButtonText>
            </Button>
          </S.OrderConfirmButton>
        </>
      ) : (
        <>
          <S.CartPageLayout>
            <TitleSet title={TITLES.cart} />
            <CartEmpty />
          </S.CartPageLayout>
        </>
      )}
    </>
  );
};

export default CartPage;
