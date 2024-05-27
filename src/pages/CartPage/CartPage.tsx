import { useRecoilValue } from "recoil";
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
import AllSelectCheckBox from "@/components/cart/AllSelectCheckBox/AllSelectCheckBox";
import AddMockItemButton from "@/mocks/AddMockItemButton";

const CartPage = () => {
  const selectedItems = useRecoilValue(totalItemOrderCountSelector);
  const cartItemList = useRecoilValue(cartItemsState);
  const navigate = useNavigate();

  const onMoveOrderConfirmPage = () => {
    navigate(PAGE_URL.orderConfirm);
  };

  return (
    <>
      <S.CartItemListWrapper>
        <AddMockItemButton />
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
