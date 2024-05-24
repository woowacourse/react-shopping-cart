/** @jsxImportSource @emotion/react */
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "river-modal-component";
import { updateOrderItems } from "../../api";
import CheckoutSummary from "../../components/CartList/CheckoutSummary";
import CouponModal from "../../components/CouponModal";
import Header from "../../components/Header";
import OrderList from "../../components/OrderList";
import PageHeader from "../../components/PageHeader";
import BorderButton from "../../components/common/BorderButton";
import BottomButton from "../../components/common/BottomButton";
import CheckBox from "../../components/common/CheckBox";
import Layout from "../../layout";
import {
  cartListState,
  islandMountainRegionCheckState,
} from "../../recoil/atoms";
import {
  orderListTotalQuantitySelector,
  selectedCartItems,
} from "../../recoil/selectors";
import { title } from "../../styles/font";
import { CartItemType } from "../../types";
import { CartListWrapper } from "../CartPage/styles";
import { OrderSummary } from "../PaymentConfirmationPage/styles";

const OrderConfirmPage: React.FC = () => {
  const setCartList = useSetRecoilState(cartListState);
  const selectedCartItem = useRecoilValue(selectedCartItems);
  const orderListTotalQuantity = useRecoilValue(orderListTotalQuantitySelector);

  const [islandMountainRegionCheck, setIslandMountainRegionCheck] =
    useRecoilState(islandMountainRegionCheckState);
  const navigate = useNavigate();

  const handleIslandMountainRegionToggle = () => {
    setIslandMountainRegionCheck((prev) => !prev);
  };

  const handleCheckoutButtonClick = async () => {
    const orderItemsId = selectedCartItem.map(
      (orderItem: CartItemType) => orderItem.id
    );
    startTransition(() => {
      setCartList([]);
    });
    updateOrderItems(orderItemsId);
    navigate("/paymentConfirm");
  };

  return (
    <Modal.Provider>
      <Layout
        header={<Header isShowLogo={false} />}
        bottom={
          <BottomButton onClick={() => handleCheckoutButtonClick()}>
            결제하기
          </BottomButton>
        }
      >
        <CouponModal />
        <PageHeader title="주문 확인">
          <OrderSummary>
            <span>{`총 ${selectedCartItem.length}종류의 상품 ${orderListTotalQuantity}개를 주문합니다.`}</span>
            <span>최종 결제 금액을 확인해주세요.</span>
          </OrderSummary>
        </PageHeader>

        <CartListWrapper>
          <OrderList items={selectedCartItem} />
        </CartListWrapper>

        <Modal.Trigger>
          <BorderButton size="full">쿠폰 적용</BorderButton>
        </Modal.Trigger>

        <h1 css={[title, { textAlign: "left" }]}>배송 정보</h1>
        <CheckBox
          isApplicable
          id="shipping-checkbox"
          label="제주도 및 도서 산간 지역"
          isSelected={islandMountainRegionCheck}
          toggleSelected={() => handleIslandMountainRegionToggle()}
        />
        <CheckoutSummary />
      </Layout>
    </Modal.Provider>
  );
};

export default OrderConfirmPage;
