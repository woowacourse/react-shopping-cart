import { useRecoilValue, useResetRecoilState } from "recoil";
import { totalItemOrderCountSelector } from "@/recoil/orderInformation";

import TitleSet from "@/components/_common/TitleSet/TitleSet";

import PriceSection from "@/components/cart/PriceSection/PriceSection";

import * as S from "./CartPage.style";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import ProductList from "@/components/cart/ProductList/ProductList";
import { cartItemsState } from "@/recoil/cartItems";
import CartEmpty from "@/components/cart/CartEmpty/CartEmpty";
import Button from "@/components/_common/Button/Button";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import { CAPTION, HEADER_TITLES } from "@/constants/titleAndCaption.ts";
import { SHIPPING_MESSSAGES } from "@/constants/shippingInfo.ts";
import useGetCartItems from "@/hooks/cart/useGetCartItems";
import { couponsState } from "@/recoil/coupons";
import { shippingFeeState } from "@/recoil/shippingFeeType";
import { useEffect } from "react";
import AllSelectCheckBox from "@/components/cart/AllSelectCheckBox/AllSelectCheckBox";

const CartPage = () => {
  const resetCoupons = useResetRecoilState(couponsState);
  const resetShippingFee = useResetRecoilState(shippingFeeState);

  useEffect(() => {
    resetCoupons();
    resetShippingFee();
  }, []);

  const selectedItems = useRecoilValue(totalItemOrderCountSelector);
  const cartItemList = useRecoilValue(cartItemsState);
  const navigate = useNavigate();

  const onMoveOrderConfirmPage = () => {
    navigate(PAGE_URL.orderConfirm);
  };

  const { getCartItems } = useGetCartItems();
  getCartItems();

  return (
    <>
      <S.CartItemListWrapper>
        {cartItemList.length ? (
          <>
            <TitleSet
              title={HEADER_TITLES.cart}
              subTitle={CART_PAGE_MESSAGES.itemCount(cartItemList.length)}
            />
            <AllSelectCheckBox />
            <ProductList productList={cartItemList} />
            <MoreInfo text={SHIPPING_MESSSAGES.freeShippingInfo} />
            <PriceSection isApplyCoupon={false} />
          </>
        ) : (
          <>
            <CartEmpty />
          </>
        )}
      </S.CartItemListWrapper>
      <Button
        size="large"
        position="bottom"
        width="full"
        theme="dark"
        disabled={!selectedItems}
        onClick={onMoveOrderConfirmPage}
      >
        {CAPTION.orderConfirm}
      </Button>
    </>
  );
};

export default CartPage;
