import { useRecoilValue } from "recoil";
import {
  totalItemLengthSelector,
  totalItemOrderCountSelector,
} from "@/recoil/orderInformation";

import Caption from "@/components/_common/Caption/Caption";
import CheckBox from "@/components/_common/CheckBox/CheckBox";
import TitleSet from "@/components/_common/TitleSet/TitleSet";

import PriceSection from "@/components/PriceSection/PriceSection";
import MoreInfo from "@/assets/more-info.svg?react";

import * as S from "./CartPage.style";
import { MESSAGES, TITLES } from "@/constants/cart";
import ProductList from "@/components/ProductList/ProductList";
import OrderConfirmButton from "@/components/OrderConfirmButton/OrderConfirmButton";
import useSelectAll from "@/hooks/useSelectAll";

const CartPage = () => {
  const totalItemLength = useRecoilValue(totalItemLengthSelector);
  const { isAllItemSelected, selectAllItem, unselectAllItem } = useSelectAll();
  const selectedItems = useRecoilValue(totalItemOrderCountSelector);

  return (
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
        <ProductList />
        <Caption asset={() => <MoreInfo />} text={MESSAGES.freeShippingInfo} />
        <PriceSection />
      </S.CartPageLayout>
      <OrderConfirmButton disabled={!selectedItems} />
    </>
  );
};

export default CartPage;
