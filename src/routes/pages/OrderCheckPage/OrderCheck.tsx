import { useLocation, useNavigate } from 'react-router';

import Header from '../../../components/@common/Header/Header';
import HeaderButton from '../../../components/@common/Header/HeaderButton';
import OrderList from '../../../components/List/OrderList/OrderList';
import ContainerLayout from '../../../components/@common/ContainerLayout/ContainerLayout';
import Text from '../../../components/@common/Text/Text';
import PayButton from '../../../components/PayButton/PayButton';
import PageTitle from '../../../components/PageTitle/PageTitle';
import OrderItem from '../../../components/ListItem/OrderItem/OrderItem';
import CouponButton from '../../../components/CouponButton/CouponButton';
import DeliveryInfo from '../../../components/DeliveryInfo/DeliveryInfo';
import OrderPriceInfo from '../../../components/PriceInfo/OrderPriceInfo/OrderPriceInfo';
import CouponModal from '../../../components/CouponModal/CouponModal';

import useModal from '../../../hooks/useModal';
import useCoupon from '../../../hooks/useCoupon';
import useSelectCoupon from '../../../hooks/useSelectCoupon';
import useFarDeliverySelect from '../../../hooks/useFarDeliverySelect';

import { CartItemProps } from '../../../types/cartItem';
import { Back } from '../../../assets';
import {
  calculateTotalDiscount,
  COUPONS,
  getAvailableCoupons,
} from './utils/coupon';
import { getDeliveryFee, getTotalProductQuantity } from './utils/product';
import { getOrderPrice, getPaymentAmount } from './utils/order';

function OrderCheck() {
  const { isOpen, openModal, closeModal } = useModal();
  const { couponList } = useCoupon();
  const { selectedCoupon, handleSelectCoupon } = useSelectCoupon();
  const { isFarDelivery, handleFarDeliverySelect } = useFarDeliverySelect();

  const navigate = useNavigate();
  const { selectedCartData, totalPrice } = useLocation().state as {
    selectedCartData: CartItemProps[];
    totalPrice: number;
  };

  const selectedCouponObjects = COUPONS.filter((c) => selectedCoupon.has(c.id));

  const orderPrice = getOrderPrice(selectedCartData);
  const deliveryFee = getDeliveryFee(orderPrice, isFarDelivery);
  const totalDiscount = calculateTotalDiscount(
    selectedCouponObjects,
    orderPrice,
    deliveryFee,
    selectedCartData
  );
  const paymentAmount = getPaymentAmount(
    orderPrice,
    deliveryFee,
    totalDiscount
  );

  const availableCouponObjects = getAvailableCoupons(
    totalPrice,
    deliveryFee,
    selectedCartData,
    new Date()
  );

  const totalProductQuantity = getTotalProductQuantity(selectedCartData);

  return (
    <>
      <Header>
        <HeaderButton src={Back} onClick={() => navigate(-1)} />
      </Header>
      <ContainerLayout>
        <PageTitle>
          <Text variant="title">주문 확인</Text>
          <Text variant="caption">
            총 {selectedCartData.length}종류의 상품 {totalProductQuantity}개를
            주문합니다.
          </Text>
        </PageTitle>
        <OrderList>
          {selectedCartData.map((cartItem) => (
            <OrderItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </OrderList>
        <CouponButton onClick={openModal} />
        <DeliveryInfo
          isFarDelivery={isFarDelivery}
          handleFarDeliverySelect={handleFarDeliverySelect}
        />
        <OrderPriceInfo
          totalPrice={orderPrice}
          deliveryFee={deliveryFee}
          couponDiscount={totalDiscount}
          paymentAmount={paymentAmount}
        />
      </ContainerLayout>
      <PayButton
        orderItemsQuantity={totalProductQuantity}
        productTypeCount={selectedCartData.length}
        orderPrice={paymentAmount}
      />
      <CouponModal
        isOpen={isOpen}
        couponList={couponList}
        selectedCoupon={selectedCoupon}
        onClose={closeModal}
        onSelectCoupon={handleSelectCoupon}
        onConfirm={closeModal}
        availableCoupons={availableCouponObjects.map((c) => c.id)}
      />
    </>
  );
}

export default OrderCheck;
