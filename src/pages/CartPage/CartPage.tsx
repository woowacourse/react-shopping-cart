import { useRecoilValue } from "recoil";
import { totalItemOrderCountSelector } from "@/recoil/orderInformation";

import CheckBox from "@/components/_common/CheckBox/CheckBox";
import TitleSet from "@/components/_common/TitleSet/TitleSet";

import PriceSection from "@/components/cart/PriceSection/PriceSection";

import * as S from "./CartPage.style";
import {
  CART_PAGE_CAPTION,
  CART_PAGE_MESSAGES,
  CART_PAGE_TITLES,
} from "@/constants/cart";
import ProductList from "@/components/cart/ProductList/ProductList";
import useSelectAll from "@/hooks/useSelectAll";
import { cartItems } from "@/recoil/cartItems";
import CartEmpty from "@/components/cart/CartEmpty/CartEmpty";
import Button from "@/components/_common/Button/Button";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";
import TextBox from "@/components/_common/TextBox/TextBox";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";

const CartPage = () => {
  const { isAllItemSelected, selectAllItem, unselectAllItem } = useSelectAll();
  const selectedItems = useRecoilValue(totalItemOrderCountSelector);
  const cartItemList = useRecoilValue(cartItems);
  const navigate = useNavigate();

  const onMoveOrderConfirmPage = () => {
    navigate(PAGE_URL.orderConfirm);
  };

  return (
    <>
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
              <TextBox
                type="caption"
                text={CART_PAGE_CAPTION.allItemSelected}
              />
            </S.CheckBoxWrapper>
            <ProductList />
            <MoreInfo text={CART_PAGE_MESSAGES.freeShippingInfo} />
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
        {CART_PAGE_CAPTION.orderConfirm}
      </Button>
    </>
  );
};

export default CartPage;
