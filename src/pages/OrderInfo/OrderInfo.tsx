import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './styled';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { CartItem } from '@type/cartItem';
import { ROUTER_URLS } from '@constants/constants';
import { discountAmountStore, selectedCoupons } from '@recoil/atoms';
import { priceInfoStore } from '@recoil/selectors';
import useOrderItems from '@api/post/orderItems';

import {
  ShoppingCartItemView,
  IsolatedRegionShippingFee,
  Coupon,
  PaymentTotalWithDiscount,
} from '@components/OrderInfo';
import ShoppingCartDescription from '@components/serviceCommon/ShoppingCartDescription/ShoppingCartDescription';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';

interface OrderInfoState {
  orderItems: CartItem[];
  kindCount: number;
  productCount: number;
  totalPrice: number;
}

const OrderInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderItems, isPending } = useOrderItems();
  const resetCoupons = useResetRecoilState(selectedCoupons);
  const resetDiscount = useResetRecoilState(discountAmountStore);
  const orderInfo = location.state as OrderInfoState | null;
  const totalPrice = useRecoilValue(priceInfoStore).total;

  useEffect(() => {
    if (orderInfo === undefined) navigate(ROUTER_URLS.ERROR);

    return () => {
      resetDiscount();
      resetCoupons();
    };
  }, [navigate, orderInfo, resetCoupons, resetDiscount]);

  const orderInfoNotNull = orderInfo as OrderInfoState;
  const cartItemIds = orderInfoNotNull.orderItems.map(item => item.id);
  const paymentInfo = {
    kindCount: orderInfoNotNull.kindCount,
    productCount: orderInfoNotNull.productCount,
    totalPrice,
  };

  return (
    <>
      <S.Container>
        <ShoppingCartDescription
          title="주문 확인"
          descriptionShowingCondition={true}
          description={`총 ${orderInfo?.kindCount}종류의 상품 ${orderInfo?.productCount}개를 주문합니다.
최종 결제 금액을 확인해 주세요.`}
        />
        {orderInfo?.orderItems.map(item => <ShoppingCartItemView key={item.id} cartItem={item} />)}
        <Coupon />
        <IsolatedRegionShippingFee />
        <PaymentTotalWithDiscount />
      </S.Container>
      <FloatingButton
        label="결제하기"
        onClick={() => orderItems(cartItemIds, paymentInfo)}
        disabled={isPending}
      />
    </>
  );
};

export default OrderInfo;
