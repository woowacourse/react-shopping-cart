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
import { Coupon } from '../../types/coupon';
import { CartItemTypes } from '../../types/cartItem';

export function OrderConfirm() {
  const { cartItems } = useCartItemsContext();
  const { coupons } = useFetchCoupons();

  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCouponIds, setSelectedCouponIds] = useState<string[]>([]);
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0);

  const navigate = useNavigate();

  const selectedCartItemIds = getItem<string[]>(SELECTED_CART_ITEM_IDS, []);

  const selectedCartItems = cartItems.filter((cartItem) =>
    selectedCartItemIds.includes(cartItem.id.toString())
  );

  const handleCouponIdsChange = (id: string) => {
    const index = selectedCouponIds.findIndex((e) => e === id);

    const copy = [...selectedCouponIds];
    if (index === -1) {
      if (selectedCouponIds.length === 2) {
        alert('쿠폰은 2개까지만 선택 가능합니다.');
        return;
      }

      copy.push(id);
      setSelectedCouponIds(copy);
    } else {
      copy.splice(index, 1);
      setSelectedCouponIds(copy);
    }

    const forward = calculateCouponPrice({
      couponIds: copy,
      coupons,
      selectedCartItems,
      deliveryFee,
      nowDate: new Date(),
    });
    const reverse = calculateCouponPrice({
      couponIds: copy.reverse(),
      coupons,
      selectedCartItems,
      deliveryFee,
      nowDate: new Date(),
    });
    if (forward < reverse) {
      setSelectedCouponIds(copy.reverse());
    }
  };

  const handleCheckBoxChange = () => {
    setIsChecked((prev) => !prev);
    setCouponDiscountAmount(
      calculateCouponPrice({
        couponIds: selectedCouponIds,
        coupons,
        selectedCartItems,
        deliveryFee: getDeliveryFee(!isChecked, totalPrice),
        nowDate: new Date(),
      })
    );
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUseClick = () => {
    setOpen(false);
    setCouponDiscountAmount(
      calculateCouponPrice({
        couponIds: selectedCouponIds,
        coupons,
        selectedCartItems,
        deliveryFee,
        nowDate: new Date(),
      })
    );
  };

  const { totalPrice } = getCartItemSummary(
    cartItems,
    selectedCartItemIds.map(String)
  );

  const deliveryFee = getDeliveryFee(isChecked, totalPrice);

  const couponPrice = calculateCouponPrice({
    couponIds: selectedCouponIds,
    coupons,
    selectedCartItems,
    deliveryFee,
    nowDate: new Date(),
  });

  const isCouponDisabled = (
    coupon: Coupon,
    cartItems: CartItemTypes[],
    deliveryFee: number
  ) =>
    calculateCouponPrice({
      couponIds: [coupon.id.toString()],
      coupons: [coupon],
      selectedCartItems: cartItems,
      deliveryFee,
      nowDate: new Date(),
    }) === 0;

  const couponWithDisabled = coupons.map((coupon) =>
    isCouponDisabled(coupon, selectedCartItems, deliveryFee)
  );

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
                현재 {selectedCartItemIds.length}종류의 상품 {}개를 주문합니다.
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
            couponDiscountAmount={couponDiscountAmount}
            deliveryFee={deliveryFee}
          />
        </Main>
        <Footer>
          <Button onClick={() => {}} type="submit" size="full" style="primary">
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
            handleCouponIdsChange={handleCouponIdsChange}
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
