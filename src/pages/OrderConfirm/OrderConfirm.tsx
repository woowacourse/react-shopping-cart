import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import Main from '../../components/layout/Main/Main';
import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
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
import Button from '../../components/Common/Button/Button';
import { getItem, SELECTED_CART_ITEM_IDS } from '../../utils/localStorage';
import { Footer } from '../../components/layout/Footer/Footer';
import { SelectedCartProductContainer } from '../../components/CartItem/SelectedCartProductContainer/SelectedCartProductContainer';
import { CheckBox } from '../../components/Common/CheckBox/CheckBox';
import { useState } from 'react';
import { PaymentSummary } from '../../components/Payment/PaymentSummary/PaymentSummary';
import { useCartItemsContext } from '../../components/Common/CartItemsProvider/CartItemsProvider';
import { getCartItemSummary } from '../../utils/getCartItemSummary';
import { Modal } from '../../components/Common/Modal/Modal';
import ModalContent from '../../components/Common/ModalContent/ModalContent';
import { ModalOverlay } from '../../components/Common/ModalOverlay/ModalOverlay';
import { CouponModalContent } from '../../components/CouponModal/CouponModalContent/CouponModalContent';
import useFetchCoupons from '../../hooks/useFetchCoupons';
import { calculateCouponPrice } from '../../utils/calculateCouponPrice';
import { getDeliveryFee } from '../../utils/getDeliveryFee';
import { useCouponSelection } from '../../hooks/useCouponSelection';
import useCouponUI from '../../hooks/useCouponUI';

const MAX_SELECTED_COUPON_COUNT = 2;
const DELIVERY_FREE_COUPON_ID = '3';

export function OrderConfirm() {
  const { cartItems } = useCartItemsContext();
  const { coupons } = useFetchCoupons();

  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const [finalSelectedCouponIds, setFinalSelectedCouponIds] = useState<
    string[]
  >([]);

  const navigate = useNavigate();

  const selectedCartItemIds = getItem<string[]>(SELECTED_CART_ITEM_IDS, []);

  const selectedCartItems = cartItems.filter((cartItem) =>
    selectedCartItemIds.includes(cartItem.id.toString())
  );

  const handleExceed = () => {
    alert(`쿠폰은 ${MAX_SELECTED_COUPON_COUNT}개까지만 선택 가능합니다.`);
  };

  const { selectedCouponIds, toggleCouponId } = useCouponSelection({
    maxCoupons: MAX_SELECTED_COUPON_COUNT,
    onExceed: handleExceed,
    calculatePrice: (couponIds) =>
      calculateCouponPrice({
        couponIds,
        coupons,
        selectedCartItems,
        deliveryFee,
        nowDate: new Date(),
      }),
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
        selectedCartItem: selectedCartItems.reduce((a, b) => a + b.quantity, 0),
        totalPrice: totalPrice - couponDiscountAmount + deliveryFee,
      },
    });
  };

  const { totalPrice } = getCartItemSummary(
    cartItems,
    selectedCartItemIds.map(String)
  );

  const deliveryFee = getDeliveryFee(isChecked, totalPrice);

  const deliveryFreeCoupon = finalSelectedCouponIds.find(
    (e) => e === DELIVERY_FREE_COUPON_ID
  )
    ? deliveryFee
    : 0;

  const couponDiscountAmount = calculateCouponPrice({
    couponIds: finalSelectedCouponIds,
    coupons,
    selectedCartItems,
    deliveryFee: getDeliveryFee(isChecked, totalPrice),
    nowDate: new Date(),
  });

  const { couponPrice, couponWithDisabled } = useCouponUI({
    coupons,
    selectedCouponIds,
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
