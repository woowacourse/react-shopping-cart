import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userLiveInSigolStates } from "../recoil/atoms";
import Header from "../components/common/Header/index";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../constants/styles";
import PageTitle from "../components/common/PageTitle";
import CartItem from "../components/ShoppingCart/CartItem";
import BasicButton from "../components/common/Button/BasicButton";
import OrderSummary from "../components/ShoppingCart/OrderSummary";
import CheckboxButton from "../components/common/Button/CheckboxButton";
import { useState } from "react";
import { Modal } from "darr-modal-components";
import { SHOPPING_MESSAGE } from "../constants/messages";
import CouponList from "../components/Coupon/CouponList";
import useCouponDiscount from "../hooks/useCouponDiscount";
import FooterButton from "../components/common/FooterButton";
import useCheckOrder from "../hooks/useCheckOrder";

const CheckOrder = () => {
  const { couponLists, checkedCartItemList, totalOrderingDescription, postShoppingOrders } = useCheckOrder();
  const { selectedCoupons, handleSelectCoupons, discountAmount } = useCouponDiscount();
  const [isSigol, setIsSigol] = useRecoilState(userLiveInSigolStates);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  return (
    <>
      {isCouponModalOpen && (
        <Modal
          modalSize="l"
          modalTitle="쿠폰을 선택해 주세요"
          closeModal={() => setIsCouponModalOpen(false)}
          hasCloseButton={true}
        >
          <CouponList selectedCoupons={selectedCoupons} coupons={couponLists} onClickCoupon={handleSelectCoupons} />
          <Modal.button
            size="large"
            buttonText={SHOPPING_MESSAGE.couponDiscountAmount(discountAmount)}
            onClick={() => setIsCouponModalOpen(false)}
          />
        </Modal>
      )}
      <Header type="goBack" />
      <PageContainer>
        <PageTitle title={SHOPPING_MESSAGE.confirmOrder} subTitle={totalOrderingDescription} />
        {checkedCartItemList.map((cartItem) => (
          <CartItem key={cartItem.id} id={cartItem.id} product={cartItem.product} cartItemType="readonly" />
        ))}
        <BasicButton
          label="쿠폰 적용"
          onClick={() => setIsCouponModalOpen(true)}
          style={{ width: "100%", height: "48px", color: COLOR.grey.smoky }}
        />
        <AboutShippingTitle>{SHOPPING_MESSAGE.aboutShipping}</AboutShippingTitle>
        <AboutShippingContent>
          <CheckboxButton id="extraShippingFee" onClick={() => setIsSigol((prev) => !prev)} isChecked={isSigol} />
          <AboutShippingText htmlFor="extraShippingFee">{SHOPPING_MESSAGE.sigol}</AboutShippingText>
        </AboutShippingContent>
        <OrderSummary discountAmount={discountAmount} />
        <FooterButton buttonText={SHOPPING_MESSAGE.makePayment} onClick={postShoppingOrders} />
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  padding: 36px 25px 104px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const AboutShippingTitle = styled.h3`
  font-size: ${FONT_SIZE.medium};
  font-weight: ${FONT_WEIGHT.bold};
  color: ${COLOR.black};
`;

const AboutShippingContent = styled.div`
  display: flex;
  color: ${COLOR.black};
  align-items: center;
`;

const AboutShippingText = styled.label`
  padding-left: 8px;
  cursor: pointer;
`;

export default CheckOrder;
