import * as S from './OrderCompletePage.styles';
import { Title, Subtitle } from '../../styles/@common/title/Title.styles';
import OrderItem from '../../components/features/orderItem/OrderItem';
import Button from '../../components/@common/button/Button';
import Checkbox from '../../components/@common/checkbox/Checkbox';
import { FREE_DELIVERY_MESSAGE } from '../../constants/systemMessages';
import infoIcon from '/public/icon/ic_info.svg';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useCartData from '../../hooks/useCartData';
import { useCoupons } from '../../hooks/useCoupons';
import { useCouponCalculation } from '../../hooks/useCouponCalculation';
import useEasyNavigate from '../../hooks/useEasyNavigate';
import * as Dialog from '../../components/@common/dialog/Dialog';
import { CouponList } from '../../components/features/couponList/CouponList';

interface OrderCompleteState {
  productTypeCount: number;
  totalProductCount: number;
}

const OrderCompletePage = () => {
  const { state } = useLocation() as { state: OrderCompleteState };
  const { productTypeCount, totalProductCount } = state;
  const { cartData, fetchCartData } = useCartData();
  const { coupons } = useCoupons();
  const { goPaymentConfirmation } = useEasyNavigate();

  // 쿠폰 계산 로직을 커스텀 훅으로 분리
  const {
    isRemoteArea,
    selectedCoupons,
    autoOptimizationResult,
    calculationResult,
    handleRemoteAreaChange,
    handleCouponSelect,
    handleUseAutoOptimization,
  } = useCouponCalculation({ cartData, coupons });

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleConfirmPayment = () => {
    goPaymentConfirmation(
      productTypeCount,
      totalProductCount,
      calculationResult.finalAmount
    );
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

        <Dialog.Root>
          <Dialog.Trigger css={S.TriggerButton}>쿠폰 적용</Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content position="bottom" size="large">
              <Dialog.Header>
                <div css={S.DialogHeader}>
                  <h2 css={S.DialogTitle}>쿠폰을 선택해주세요</h2>
                  <Dialog.CloseButton>
                    <span css={S.CloseButton}>✕</span>
                  </Dialog.CloseButton>
                </div>
              </Dialog.Header>

              <div css={S.DialogContent}>
                <div css={S.OptimizationInfo}>
                  <h3>자동 최적화 결과</h3>
                  <p>
                    현재 주문에서 가장 할인 효과가 큰 쿠폰 조합을 자동으로
                    선택했습니다.
                  </p>

                  {autoOptimizationResult.appliedCoupons.length > 0 ? (
                    <div css={S.OptimalResult}>
                      <h4>추천 쿠폰:</h4>
                      {autoOptimizationResult.discountBreakdown.map(
                        (item, index) => (
                          <div key={index} css={S.CouponBreakdown}>
                            <span>{item.coupon.code}</span>
                            <span>
                              -{item.discountAmount.toLocaleString()}원
                            </span>
                          </div>
                        )
                      )}
                      <div css={S.TotalSavings}>
                        총 절약 금액:{' '}
                        {autoOptimizationResult.discountAmount.toLocaleString()}
                        원
                      </div>
                      <Button
                        variant="coupon"
                        onClick={handleUseAutoOptimization}
                        css={S.AutoOptimizeButton}
                      >
                        자동 최적화 적용하기
                      </Button>
                    </div>
                  ) : (
                    <p css={S.NoOptimization}>
                      현재 주문에 적용 가능한 쿠폰이 없습니다.
                    </p>
                  )}
                </div>

                <div css={S.ManualSelectSection}>
                  <h3>직접 선택 (최대 2개)</h3>
                  <p>
                    원하는 쿠폰을 직접 선택할 수 있습니다. 선택된 쿠폰:{' '}
                    {selectedCoupons.length}/2
                  </p>
                  {selectedCoupons.length > 0 && (
                    <div css={S.SelectedCouponsPreview}>
                      {selectedCoupons.map((coupon) => (
                        <div key={coupon.id} css={S.SelectedCouponPreview}>
                          <span>{coupon.code}</span>
                          <button
                            onClick={() => handleCouponSelect(coupon)}
                            css={S.RemoveCouponButton}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <CouponList onCouponSelect={handleCouponSelect} />

                <div css={S.DialogActions}>
                  <Dialog.CloseButton>
                    <Button variant="largeBlack">쿠폰 적용하기</Button>
                  </Dialog.CloseButton>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {calculationResult.appliedCoupons.length > 0 && (
          <div css={S.SelectedCouponContainer}>
            <p css={S.SelectedCouponTitle}>
              적용된 쿠폰 ({calculationResult.appliedCoupons.length}개)
            </p>
            {calculationResult.discountBreakdown.map((item, index) => (
              <p key={index} css={S.SelectedCouponInfo}>
                <strong>{item.coupon.code}</strong> - {item.coupon.description}
                {item.discountAmount > 0 ? (
                  <span css={S.DiscountAmount}>
                    (-{item.discountAmount.toLocaleString()}원)
                  </span>
                ) : item.coupon.discountType === 'freeShipping' ? (
                  <span css={S.DiscountAmount}>(배송비 무료)</span>
                ) : null}
              </p>
            ))}
          </div>
        )}

        <div css={S.DeliveryInfoContainer}>
          <p css={S.DeliveryInfoTitle}>배송 정보</p>
          <div css={S.DeliveryInfoCheckboxContainer}>
            <Checkbox
              checked={isRemoteArea}
              onChange={handleRemoteAreaChange}
            />
            <p css={S.DeliveryDifficultArea}>제주도 및 도서 산간 지역</p>
          </div>
          <div css={S.InfoMessageContainer}>
            <img src={infoIcon} alt="info" />
            <p css={Subtitle}>{FREE_DELIVERY_MESSAGE}</p>
          </div>

          <div css={S.CartPriceInfoContainer}>
            <div css={S.CartPriceSubtitle}>주문 금액</div>
            <div css={Title}>
              {calculationResult.originalAmount.toLocaleString()}원
            </div>
          </div>

          {calculationResult.discountAmount > 0 && (
            <div css={S.CartPriceInfoContainer}>
              <div css={S.CartPriceSubtitle}>쿠폰 할인 금액</div>
              <div css={Title}>
                -{calculationResult.discountAmount.toLocaleString()}원
              </div>
            </div>
          )}
        </div>

        <div css={S.CartPriceInfoContainer}>
          <div css={S.CartPriceSubtitle}>배송비</div>
          <div css={Title}>
            {calculationResult.shippingFee === 0
              ? '무료'
              : `${calculationResult.shippingFee.toLocaleString()}원`}
          </div>
        </div>

        <div css={S.CartPriceInfoContainer}>
          <div css={S.CartPriceSubtitle}>총 결제 금액</div>
          <div css={Title}>
            {calculationResult.finalAmount.toLocaleString()}원
          </div>
        </div>
      </div>

      <Button variant="largeBlack" onClick={handleConfirmPayment}>
        {calculationResult.finalAmount.toLocaleString()}원 결제하기
      </Button>
    </section>
  );
};

export default OrderCompletePage;
