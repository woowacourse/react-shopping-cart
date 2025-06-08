import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as S from './OrderCompletePage.styles';
import { Subtitle, Title } from '../../styles/@common/title/Title.styles';
import OrderItem from '../../components/features/orderItem/OrderItem';
import useCartData from '../../hooks/useCartData';
import Button from '../../components/@common/button/Button';
import Checkbox from '../../components/@common/checkbox/Checkbox';
import infoIcon from '/public/icon/ic_info.svg';
import { FREE_DELIVERY_MESSAGE } from '../../constants/systemMessages';
import * as Dialog from '../../components/@common/dialog/Dialog';
import { CouponList } from '../../components/features/couponList';
import { Coupon } from '../../types/coupon';

interface OrderCompleteState {
  productTypeCount: number;
  totalProductCount: number;
}

const OrderCompletePage = () => {
  const { state } = useLocation() as { state: OrderCompleteState };
  const { productTypeCount, totalProductCount } = state;
  const { cartData, fetchCartData } = useCartData();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleCouponSelect = (coupon: Coupon | null) => {
    setSelectedCoupon(coupon);
  };

  const handleConfirmPayment = () => {
    // 실제 결제 로직
    console.log('결제 진행', { selectedCoupon });
  };

  return (
    <section css={S.CartPageWrapper}>
      <div css={S.CartTitleContainer}>
        <p css={Title}>주문 확인</p>
        <p css={Subtitle}>
          총 {productTypeCount}종류의 상품 {totalProductCount}개를 주문합니다.
        </p>
        <p css={Subtitle}>최종 결제 금액을 확인해 주세요.</p>

        {cartData.map((item) => (
          <OrderItem key={item.id} cartData={item} />
        ))}

        <Button variant="coupon">쿠폰 적용</Button>

        {selectedCoupon && (
          <div css={S.SelectedCouponContainer}>
            <p css={S.SelectedCouponTitle}>선택된 쿠폰</p>
            <p css={S.SelectedCouponInfo}>
              <strong>{selectedCoupon.code}</strong> -{' '}
              {selectedCoupon.description}
            </p>
          </div>
        )}

        <div css={S.DeliveryInfoContainer}>
          <p css={S.DeliveryInfoTitle}>배송 정보</p>
          <div css={S.DeliveryInfoCheckboxContainer}>
            <Checkbox checked={true} onChange={() => {}} />
            <p css={S.DeliveryDifficultArea}>제주도 및 도서 산간 지역</p>
          </div>
          <div css={S.InfoMessageContainer}>
            <img src={infoIcon} alt="info" />
            <p css={Subtitle}>{FREE_DELIVERY_MESSAGE}</p>
          </div>

          <div css={S.CartPriceInfoContainer}>
            <div css={S.CartPriceSubtitle}>주문 금액</div>
            <div css={Title}>
              {/* {totalCartItemPrice > FEE.DELIVERY_FEE_STANDARD */}
              {/* ? FEE.DELIVERY_FEE_FREE */}
              {/* : FEE.DELIVERY_FEE.toLocaleString()} */}원
            </div>
          </div>
          {/* {totalCartItemPrice !== FEE.DELIVERY_FEE_FREE && ( */}
          <div css={S.CartPriceInfoContainer}>
            <div css={S.CartPriceSubtitle}>쿠폰 할인 금액</div>
            <div css={Title}>
              {/* {totalCartItemPrice > FEE.DELIVERY_FEE_STANDARD */}
              {/* ? FEE.DELIVERY_FEE_FREE */}
              {/* : FEE.DELIVERY_FEE.toLocaleString()} */}원
            </div>
          </div>
          {/* )} */}
        </div>
        <div css={S.CartPriceInfoContainer}>
          <div css={S.CartPriceSubtitle}>배송비</div>
          {/* {totalCartItemPrice !== 0 && ( */}
          <div css={Title}>{/* {totalPrice.toLocaleString()} */}원</div>
          {/* )} */}
        </div>

        <div css={S.CartPriceInfoContainer}>
          <div css={S.CartPriceSubtitle}>총 결제 금액</div>
          {/* {totalCartItemPrice !== 0 && ( */}
          <div css={Title}>{/* {totalPrice.toLocaleString()} */}원</div>
          {/* )} */}
        </div>
      </div>

      <Dialog.Root>
        <Dialog.Trigger css={S.TriggerButton}>결제하기</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content position="bottom" size="large">
            <Dialog.Header>
              <div css={S.DialogHeader}>
                <h2>쿠폰 선택</h2>
                <Dialog.CloseButton>
                  <span css={S.CloseButton}>✕</span>
                </Dialog.CloseButton>
              </div>
            </Dialog.Header>

            <div css={S.DialogContent}>
              <CouponList
                onCouponSelect={handleCouponSelect}
                selectedCouponId={selectedCoupon?.id}
              />

              <div css={S.DialogActions}>
                <Dialog.CloseButton>
                  <Button variant="largeBlack" onClick={handleConfirmPayment}>
                    {selectedCoupon ? '쿠폰 적용하고 결제하기' : '결제하기'}
                  </Button>
                </Dialog.CloseButton>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default OrderCompletePage;
