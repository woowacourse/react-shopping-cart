import OrderConfirmFetcher from '@apis/orderConfirm';
import { UpsideDownExclamation } from '@assets/index';
import { BottomButton, Checkbox, LoadingSpinner } from '@components/common';
import APIErrorBoundary from '@components/common/ErrorBoundary/APIErrorBoundary';
import ErrorFallback from '@components/common/ErrorBoundary/ErrorFallback/ErrorFallback';
import { CouponSelectModal, ItemCouponButton, SelectedItemList } from '@components/orderConfirm';
import { OrderPrice } from '@components/shoppingCart';
import { PRICE } from '@constants/shippingCart';
import { useCheckInaccessibleArea } from '@hooks/orderConfirm';
import { useOrderCosts, useSelectedCartItems } from '@hooks/shoppingCart';
import { selectedCouponListAtom } from '@recoil/orderConfirm';
import { selectedIdsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { formatKoreanCurrency } from '@utils/currency';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import * as Styled from './OrderConfirmPage.styled';

const itemCouponButtonStyle = { margin: '32px 0px' };

const OrderConfirmPage = () => {
  const selectedCouponList = useRecoilValue(selectedCouponListAtom);

  const { selectedItems, totalSelectedItemLength, selectedTotalQuantity } = useSelectedCartItems();

  const { isInaccessibleArea, handleChangeInaccessibleAreaCheckBox, isDisabledInaccessibleAreaCheckBox } =
    useCheckInaccessibleArea();

  const {
    orderPrice,
    shippingPrice: prevShippingPrice,
    totalPrice: prevTotalPrice,
    totalDiscountPrice: prevTotalDiscountPrice,
  } = useOrderCosts();

  const shippingPrice = isInaccessibleArea
    ? prevShippingPrice + PRICE.shippingFee.inaccessibleAreas
    : prevShippingPrice;

  const totalDiscountPrice =
    selectedCouponList.find((coupon) => coupon.discountType === 'freeShipping') && isInaccessibleArea
      ? prevTotalDiscountPrice + PRICE.shippingFee.inaccessibleAreas
      : prevTotalDiscountPrice;

  const totalPrice =
    (isInaccessibleArea ? prevTotalPrice + PRICE.shippingFee.inaccessibleAreas : prevTotalPrice) - totalDiscountPrice;

  const [isOpen, setIsOpen] = useState(false);

  /* reset page */
  const resetSelectedCouponList = useResetRecoilState(selectedCouponListAtom);

  useEffect(() => {
    resetSelectedCouponList();
  }, [resetSelectedCouponList]);

  /* button click */
  const selectedIds = useRecoilValue(selectedIdsAtom);

  const navigate = useNavigate();

  const handlePaymentConfirm = async () => {
    await OrderConfirmFetcher.postNewOrders([...selectedIds]);

    navigate(ROUTE_PATHS.paymentConfirm);
  };

  return (
    <>
      <Styled.OrderConfirmTitle>주문 확인</Styled.OrderConfirmTitle>
      <Styled.OrderConfirmSubTitle>
        총 {totalSelectedItemLength}종류의 상품 {selectedTotalQuantity}개를 주문합니다. <br /> 최종 결제 금액을
        확인해주세요.
      </Styled.OrderConfirmSubTitle>
      <SelectedItemList selectedItems={selectedItems} />
      <APIErrorBoundary onReset={() => navigate(ROUTE_PATHS.orderConfirm)} fallback={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner $width="100%" $height="10vh" />}>
          <ItemCouponButton onClick={() => setIsOpen((prev) => !prev)} style={itemCouponButtonStyle}>
            쿠폰 적용
          </ItemCouponButton>
          {isOpen && (
            <CouponSelectModal
              isInaccessibleArea={isInaccessibleArea}
              isOpen={isOpen}
              onToggle={() => setIsOpen((prev) => !prev)}
            />
          )}
        </Suspense>
      </APIErrorBoundary>
      <Styled.HeadingText>배송 정보</Styled.HeadingText>
      <Styled.OrderDetailWrapper>
        <Checkbox
          disabled={isDisabledInaccessibleAreaCheckBox}
          checked={isInaccessibleArea}
          onChange={handleChangeInaccessibleAreaCheckBox}
        />
        <Styled.LabelText $isDisabled={isDisabledInaccessibleAreaCheckBox}>제주도 및 도서 산간 지역</Styled.LabelText>
      </Styled.OrderDetailWrapper>
      <Styled.CartInfoBanner>
        <UpsideDownExclamation />
        <Styled.CartInfoBannerText>
          총 주문 금액이 {formatKoreanCurrency(PRICE.freeShippingMinAmount)} 이상일 경우 무료 배송됩니다.
        </Styled.CartInfoBannerText>
      </Styled.CartInfoBanner>
      <OrderPrice
        orderPrice={orderPrice}
        shippingPrice={shippingPrice}
        discountPrice={totalDiscountPrice}
        totalPrice={totalPrice}
      />
      <BottomButton onClick={handlePaymentConfirm}>결제 확인</BottomButton>
    </>
  );
};

export default OrderConfirmPage;
