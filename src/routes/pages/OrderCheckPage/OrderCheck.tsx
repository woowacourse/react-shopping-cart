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

import { CartItemProps } from '../../../types/cartItem';
import { Back } from '../../../assets';

function OrderCheck() {
  const { isOpen, openModal, closeModal } = useModal();
  const { couponList } = useCoupon();
  const navigate = useNavigate();
  const { selectedCartData, totalPrice } = useLocation().state as {
    selectedCartData: CartItemProps[];
    totalPrice: number;
  };
  const totalProductQuantity = selectedCartData.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  return (
    <>
      <Header>
        <HeaderButton src={Back} onClick={() => navigate(-1)} />
      </Header>
      <ContainerLayout>
        <PageTitle>
          <Text varient="title">주문 확인</Text>
          <Text varient="caption">
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
        <DeliveryInfo />
        <OrderPriceInfo
          totalPrice={totalPrice}
          deliveryFee={deliveryFee}
          couponDiscount={couponDiscount}
        />
      </ContainerLayout>
      <PayButton />
      <CouponModal
        isOpen={isOpen}
        couponList={couponList}
        selectedCoupon={new Set()}
        onClose={closeModal}
        onSelectCoupon={() => {}}
        onConfirm={closeModal}
        availableCoupons={availableCoupons}
      />
    </>
  );
}

export default OrderCheck;
