import ShoppingCartDescription from '../ShoppingCartDescription/ShoppingCartDescription';
import * as S from './styled';
import ShoppingCartItemView from '../ShoppingCartItemView/ShoppingCartItemView';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from '../../types/cartItem';
import IsolatedRegionShippingFee from '../IsolatedRegionShippingFee/IsolatedRegionShippingFee';
import PaymentTotalWithDiscount from '../PaymentTotalWithDiscount/PaymentTotalWithDiscount';
import Coupon from '../Coupon/Coupon';
import { useEffect } from 'react';
import { ROUTER_URLS } from '../../constants/constants';
import { useResetRecoilState } from 'recoil';
import { discountAmountStore, selectedCoupons } from '../../recoil/atoms';

interface OrderInfoState {
  orderItems: CartItem[];
  kindCount: number;
  productCount: number;
  totalPrice: number;
}

const OrderInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resetCoupons = useResetRecoilState(selectedCoupons);
  const resetDiscount = useResetRecoilState(discountAmountStore);
  const orderInfo = location.state as OrderInfoState | null;

  useEffect(() => {
    if (orderInfo === undefined) navigate(ROUTER_URLS.ERROR);

    return () => {
      resetDiscount();
      resetCoupons();
    };
  }, [navigate, orderInfo, resetCoupons, resetDiscount]);

  return (
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
  );
};

export default OrderInfo;
