import { CartItemProps } from '../../../types/cartItem';
import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import { Back } from '../../../assets';
import { useNavigate } from 'react-router';
import PayButton from '../../../components/PayButton/PayButton';
import { TEXT } from '../../../constants/text';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import OrderCartItem from '../../../components/CartItem/OrderCartItem';
import CouponButton from '../../../components/CouponButton/CouponButton';
import DeliverInfo from '../../../components/DeliverInfo/DeliverInfo';
import CartPriceCouponInfo from '../../../components/CartPriceInfo/CartPriceCouponInfo';
import { useCartContext } from '../../../context/CartContext';
import { useState } from 'react';
import CouponModal from '../../../components/CouponModal/CouponModal';

function OrderCheck() {
  const navigate = useNavigate();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const cart = useCartContext();
  const selectedCartItems = cart.data?.filter((item: CartItemProps) =>
    cart.selectedItems.includes(item.id)
  );

  const typeCount = cart.selectedItems.length;
  const totalCount = selectedCartItems.reduce(
    (acc: number, curr: CartItemProps) => {
      return acc + curr?.quantity;
    },
    0
  );

  const handleCouponButtonClick = () => {
    setIsCouponModalOpen(true);
  };

  const handleCouponModalClose = () => {
    setIsCouponModalOpen(false);
  };

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
          description={`총 ${typeCount}종류의 상품 ${totalCount}개를 주문합니다.\n최종 결제 금액을 확인해주세요.`}
        />
        <ul>
          {selectedCartItems.map((item: CartItemProps) => (
            <OrderCartItem key={item.id} item={item} />
          ))}
        </ul>
        <CouponButton onClick={handleCouponButtonClick} />
        <DeliverInfo />
        <CartPriceCouponInfo />
      </ContainerLayout>
      <PayButton />
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={handleCouponModalClose}
      />
    </>
  );
}

export default OrderCheck;
