/** @jsxImportSource @emotion/react */
import { useRecoilValue, useRecoilValueLoadable } from "recoil";

import { Modal } from "river-modal-component";
import InfoIconSrc from "../../assets/infoIcon.png";
import CheckoutSummary from "../../components/CartList/CheckoutSummary";
import {
  Info,
  InfoIcon,
} from "../../components/CartList/CheckoutSummary/style";
import CouponList from "../../components/CouponList";
import Header from "../../components/Header";
import OrderList from "../../components/OrderList";
import PageHeader from "../../components/PageHeader";
import BorderButton from "../../components/common/BorderButton";
import BottomButton from "../../components/common/BottomButton";
import CheckBox from "../../components/common/CheckBox";
import RecoilSuspense from "../../components/common/RecoilSuspense";
import { MAX_APPLICABLE_COUPONS } from "../../constants";
import Layout from "../../layout";
import { cartListState } from "../../recoil/atoms";
import {
  cartListTotalPrice,
  cartListTotalQuantity,
} from "../../recoil/selectors";
import { title } from "../../styles/font";
import { CartListWrapper } from "../CartPage/styles";
import { OrderSummary } from "../PaymentConfirmationPage/styles";

const OrderConfirmPage: React.FC = () => {
  const cartList = useRecoilValueLoadable(cartListState);
  const totalPrice = useRecoilValue(cartListTotalPrice);
  const totalQuantity = useRecoilValue(cartListTotalQuantity);

  return (
    <Modal.Provider>
      <Modal.Content
        modalPosition="center"
        closeButtonPosition="bottom"
        size="small"
      >
        <Modal.Header title="쿠폰을 선택해 주세요" containClose />
        <Modal.Body>
          <Info>
            <InfoIcon src={InfoIconSrc} alt="Info Icon" />
            {`쿠폰은 최대 ${MAX_APPLICABLE_COUPONS}개까지 사용할 수 있습니다.`}
          </Info>
          <CouponList />
        </Modal.Body>
        <Modal.Footer align="center">
          <Modal.Close>
            <BorderButton size="full" bgColor="#000" color="#fff">
              5,000원 할인 적용
            </BorderButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
      <Layout
        header={<Header isShowLogo={false} />}
        bottom={<BottomButton isDisabled>결제하기</BottomButton>}
      >
        <RecoilSuspense
          loadable={cartList}
          fallback={<div>안쪽 로딩 중...</div>}
        >
          <PageHeader title="주문 확인">
            <OrderSummary>
              <span>{`총 ${cartList.contents.length}종류의 상품 ${totalQuantity}개를 주문합니다.`}</span>
              <span>최종 결제 금액을 확인해주세요.</span>
            </OrderSummary>
          </PageHeader>

          <CartListWrapper>
            <OrderList items={cartList.contents} />
          </CartListWrapper>

          <Modal.Trigger>
            <BorderButton size="full" onClick={() => {}}>
              쿠폰 적용
            </BorderButton>
          </Modal.Trigger>

          <h1 css={[title, { textAlign: "left" }]}>배송 정보</h1>
          <CheckBox
            id="shipping-checkbox"
            label="제주도 및 도서 산간 지역"
            isSelected
            toggleSelected={() => {}}
          />
          <CheckoutSummary />
        </RecoilSuspense>
      </Layout>
    </Modal.Provider>
  );
};

export default OrderConfirmPage;
