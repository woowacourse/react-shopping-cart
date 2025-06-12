import { useLocation } from 'react-router';
import { useCouponSelection } from './useCouponSelection';
import { useShippingFee } from './useShippingFee';
import { calculateCouponDiscount } from '../utils/couponCalculations';

export const useOrderConfirm = () => {
  const location = useLocation();
  const { products, price } = location.state || {};

  const {
    selectedCoupons,
    tempSelectedCoupons,
    modalEnabled,
    openModal: openCouponModal,
    closeModal: closeCouponModal,
    toggleCouponSelection,
    isCouponSelected,
    applyCoupons,
  } = useCouponSelection();

  const { remoteArea, toggleRemoteArea, baseShippingFee, remoteAreaFee, totalShippingFee } =
    useShippingFee({
      subtotal: price,
      selectedCoupons,
    });

  const couponDiscount = calculateCouponDiscount({
    coupons: selectedCoupons,
    products: products || [],
    total: price,
    shippingFee: baseShippingFee + remoteAreaFee,
  });

  const tempCouponDiscount = calculateCouponDiscount({
    coupons: tempSelectedCoupons || [],
    products: products || [],
    total: price,
    shippingFee: baseShippingFee + remoteAreaFee,
  });

  const finalTotal = price - couponDiscount + totalShippingFee;

  return {
    // 쿠폰 관련 로직
    selectedCoupons,
    tempSelectedCoupons,
    modalEnabled,
    openCouponModal,
    closeCouponModal,
    toggleCouponSelection,
    isCouponSelected,
    applyCoupons,

    // 배송 관련
    remoteArea,
    toggleRemoteArea,
    totalShippingFee,

    // 가격 계산
    couponDiscount,
    tempCouponDiscount,
    finalTotal,
  };
};
