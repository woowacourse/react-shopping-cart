import { useRecoilValue } from "recoil";
import { totalItemOrderCountSelector } from "@/recoil/orderInformation";

import Caption from "@/components/_common/Caption/Caption";
import CheckBox from "@/components/_common/CheckBox/CheckBox";
import TitleSet from "@/components/_common/TitleSet/TitleSet";

import PriceSection from "@/components/PriceSection/PriceSection";
import MoreInfo from "@/assets/more-info.svg?react";

import * as S from "./CartPage.style";
import {
  CART_PAGE_CAPTION,
  CART_PAGE_MESSAGES,
  CART_PAGE_TITLES,
} from "@/constants/cart";
import ProductList from "@/components/ProductList/ProductList";
import useSelectAll from "@/hooks/useSelectAll";
import { cartItems } from "@/recoil/cartItems";
import CartEmpty from "@/components/CartEmpty/CartEmpty";
import Button from "@/components/_common/Button/Button";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";

const CartPage = () => {
  const { isAllItemSelected, selectAllItem, unselectAllItem } = useSelectAll();
  const selectedItems = useRecoilValue(totalItemOrderCountSelector);
  const cartItemList = useRecoilValue(cartItems);
  const navigate = useNavigate();

  const onMoveOrderConfirmPage = () => {
    navigate(PAGE_URL.orderConfirm);
  };

  return (
    <S.CartPageWrapper>
      <S.CartItemListWrapper>
        {cartItemList.length ? (
          <>
            <TitleSet
              title={CART_PAGE_TITLES.cart}
              subTitle={CART_PAGE_MESSAGES.itemCount(cartItemList.length)}
            />
            <S.CheckBoxWrapper>
              <CheckBox
                isChecked={isAllItemSelected}
                onClick={isAllItemSelected ? unselectAllItem : selectAllItem}
              />
              <Caption text={CART_PAGE_CAPTION.allItemSelected} />
            </S.CheckBoxWrapper>
            <ProductList />
            <Caption
              asset={() => <MoreInfo />}
              text={CART_PAGE_MESSAGES.freeShippingInfo}
            />
            <PriceSection />
          </>
        ) : (
          <>
            <CartEmpty />
          </>
        )}
      </S.CartItemListWrapper>
      <Button
        position="bottom"
        size="xLarge"
        width="full"
        theme="dark"
        disabled={!selectedItems}
        onClick={onMoveOrderConfirmPage}
      >
        <S.ButtonText>{CART_PAGE_CAPTION.orderConfirm}</S.ButtonText>
      </Button>
    </S.CartPageWrapper>
  );
};

export default CartPage;
