import { useRecoilValue, useRecoilValueLoadable } from "recoil";

import { useNavigate } from "react-router-dom";
import BlankCart from "../../components/BlankCart";
import CartList from "../../components/CartList";
import CheckoutSummary from "../../components/CartList/CheckoutSummary";
import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import BottomButton from "../../components/common/BottomButton";
import RecoilSuspense from "../../components/common/RecoilSuspense";
import Layout from "../../layout";
import { cartListState } from "../../recoil/atoms";
import { orderListTotalQuantitySelector } from "../../recoil/selectors";
import { CartListWrapper, CartPageContainer } from "./styles";

export default function CartPage() {
  const cartList = useRecoilValueLoadable(cartListState);
  const orderListTotalQuantity = useRecoilValue(orderListTotalQuantitySelector);
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    navigate("/orderConfirm");
  };

  return (
    <RecoilSuspense loadable={cartList} fallback={<div>로딩 중...</div>}>
      <Layout
        header={<Header isShowLogo={true} />}
        bottom={
          <BottomButton
            onClick={handleConfirmOrder}
            isDisabled={orderListTotalQuantity === 0}
          >
            주문 확인
          </BottomButton>
        }
      >
        {cartList.contents.length !== 0 ? (
          <CartPageContainer>
            <PageHeader title="장바구니">
              <span>
                현재 {cartList.contents.length}종류의 상품이 담겨져있습니다.
              </span>
            </PageHeader>
            <CartListWrapper>
              <CartList items={cartList.contents} />
            </CartListWrapper>
            <CheckoutSummary />
          </CartPageContainer>
        ) : (
          <BlankCart />
        )}
      </Layout>
    </RecoilSuspense>
  );
}
