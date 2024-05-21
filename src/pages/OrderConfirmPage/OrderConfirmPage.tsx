import Caption from "@/components/_common/Caption/Caption";
import TitleSet from "@/components/_common/TitleSet/TitleSet";
import { CART_PAGE_CAPTION, CART_PAGE_MESSAGES } from "@/constants/cart";
import { totalItemOrderCountSelector } from "@/recoil/orderInformation";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { useRecoilValue } from "recoil";
import * as S from "./OrderConfirmPage.style";
import ProductList from "@/components/ProductList/ProductList";
import Button from "@/components/_common/Button/Button";

const OrderConfirmPage = () => {
  const totalItemsCount = useRecoilValue(totalItemOrderCountSelector);
  const selectedItemsId = useRecoilValue(selectedCartItemsIdState);

  return (
    <S.Wrapper>
      <TitleSet
        title={CART_PAGE_CAPTION.orderConfirm}
        subTitle={
          <>
            <Caption
              text={CART_PAGE_MESSAGES.orderInfo(
                selectedItemsId.length,
                totalItemsCount
              )}
            />
            <Caption text={CART_PAGE_MESSAGES.askOrderConfirm} />
          </>
        }
      />
      <S.CartItemListWrapper>
        <ProductList type="readonly" />
      </S.CartItemListWrapper>
      <Button radiusVariant="rounded">쿠폰 적용</Button>
    </S.Wrapper>
  );
};

export default OrderConfirmPage;
