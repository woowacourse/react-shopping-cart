import { CartItemProps } from '../../../types/cartItem';
import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import { Back } from '../../../assets';
import { useLocation, useNavigate } from 'react-router';
import PayButton from '../../../components/PayButton/PayButton';
import { TEXT } from '../../../constants/text';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import OrderCartItem from '../../../components/CartItem/OrderCartItem';
import CouponButton from '../../../components/CouponButton/CouponButton';
import DeliverInfo from '../../../components/DeliverInfo/DeliverInfo';
import CartPriceCouponInfo from '../../../components/CartPriceInfo/CartPriceCouponInfo';

function OrderCheck() {
  const navigate = useNavigate();
  // const { selectedCartData, totalPrice } = useLocation().state as {
  //   selectedCartData: CartItemProps[];
  //   totalPrice: number;
  // };

  return (
    <>
      <Header>
        <HeaderButton onClick={() => navigate(-1)}>
          <img src={Back} alt="뒤로가기 버튼" />
        </HeaderButton>
      </Header>
      <ContainerLayout>
        <CartListTitle
          title={TEXT.ORDER_CHECK}
          description={`총 [동적연결필요]종류의 상품 [동적연결필요]개를 주문합니다.\n최종 결제 금액을 확인해주세요.`}
        />
        <ul>
          <OrderCartItem />
          <OrderCartItem />
        </ul>
        <CouponButton />
        <DeliverInfo />
        <CartPriceCouponInfo />
      </ContainerLayout>
      <PayButton />
    </>
  );
}

export default OrderCheck;
