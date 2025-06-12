import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  backButton,
  backImg,
  titleBox,
  subTitleStyle,
  titleStyle,
  subTitleBox,
  applyButton,
  checkBoxWrapper,
  labelText,
  deliveryText,
} from './OrderConfirm.style';
import {
  Button,
  Footer,
  Header,
  Main,
  Modal,
  ModalContent,
  ModalOverlay,
  CheckBox,
  PaymentSummary,
  CouponModalContent,
  SelectedCartProductContainer,
  PageLayout,
} from '../../components';
import { useCartItemsContext } from '../../components/Common/CartItemsProvider/CartItemsProvider';
import { calculateCouponPrice } from '../../domain';

import {
  useFetchCoupons,
  useCouponSelection,
  useSelectedCartItems,
} from '../../hooks';
import { getOrderCalculationData, getCouponUIData } from '../../domain';

const MAX_SELECTED_COUPON_COUNT = 2;

export function OrderConfirm() {
  const { cartItems } = useCartItemsContext();
  const { coupons } = useFetchCoupons();
  const {
    selectedCartItemIds,
    selectedCartItems,
    selectedCartItemsTotalQuantity,
  } = useSelectedCartItems();

  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [finalSelectedCouponIds, setFinalSelectedCouponIds] = useState<
    string[]
  >([]);

  const navigate = useNavigate();

  const handleExceed = () => {
    alert(`쿠폰은 ${MAX_SELECTED_COUPON_COUNT}개까지만 선택 가능합니다.`);
  };

  const { selectedCouponIds, toggleCouponId, selectedCoupons } =
    useCouponSelection({
      coupons,
      maxCoupons: MAX_SELECTED_COUPON_COUNT,
      onExceed: handleExceed,
      calculatePrice: (couponSelectionCandidate) => {
        calculateCouponPrice({
          selectedCoupons: couponSelectionCandidate,
          selectedCartItems,
          deliveryFee,
          nowDate: new Date(),
        });
      },
    });

  const handleCheckBoxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUseClick = () => {
    setOpen(false);
    setFinalSelectedCouponIds(selectedCouponIds);
  };

  const handlePaymentClick = () => {
    navigate('/payment-confirm', {
      state: {
        selectedItemGroupCount: selectedCartItemIds.length,
        selectedCartItem: selectedCartItemsTotalQuantity,
        totalPrice: totalPrice - couponDiscountAmount + deliveryFee,
      },
    });
  };

  const { totalPrice, deliveryFee, deliveryFreeCoupon, couponDiscountAmount } =
    getOrderCalculationData({
      cartItems,
      selectedCartItemIds,
      coupons,
      finalSelectedCouponIds,
      selectedCartItems,
      isChecked,
    });

  const { couponPrice, couponWithDisabled } = getCouponUIData({
    coupons,
    selectedCoupons,
    selectedCartItems,
    deliveryFee,
  });

  return (
    <>
      <PageLayout>
        <Header>
          <button css={backButton} onClick={handleBackClick}>
            <img css={backImg} src="./back.png" />
          </button>
        </Header>
        <Main>
          <div css={titleBox}>
            <p css={titleStyle}>주문 확인</p>
            <div css={subTitleBox}>
              <p css={subTitleStyle}>
                현재 {selectedCartItemIds.length}종류의 상품{' '}
                {selectedCartItems.reduce((a, b) => a + b.quantity, 0)}개를
                주문합니다.
              </p>
              <p css={subTitleStyle}>최종 결제 금액을 확인해 주세요.</p>
            </div>
          </div>
          <SelectedCartProductContainer cartItems={selectedCartItems} />
          <button css={applyButton} onClick={() => setOpen(true)}>
            쿠폰 적용
          </button>
          <div>
            <p css={deliveryText}>배송 정보</p>
            <div css={checkBoxWrapper}>
              <CheckBox
                id="mountainousArea"
                isChecked={isChecked}
                onChange={handleCheckBoxChange}
                dataTestId="mountainousArea"
              />
              <label htmlFor="mountainousArea" css={labelText}>
                제주도 및 도서 산간 지역
              </label>
            </div>
          </div>
          <PaymentSummary
            price={totalPrice}
            couponDiscountAmount={couponDiscountAmount - deliveryFreeCoupon}
            deliveryFee={deliveryFee - deliveryFreeCoupon}
          />
        </Main>
        <Footer>
          <Button
            onClick={handlePaymentClick}
            type="submit"
            size="full"
            style="primary"
          >
            결제하기
          </Button>
        </Footer>
      </PageLayout>
      <Modal open={open}>
        <ModalOverlay setOpen={setOpen} />
        <ModalContent>
          <CouponModalContent
            handleClose={handleClose}
            handleUseClick={handleUseClick}
            handleCouponIdsChange={toggleCouponId}
            coupons={coupons}
            selectedCouponIds={selectedCouponIds}
            couponPrice={couponPrice}
            couponWithDisabled={couponWithDisabled}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
