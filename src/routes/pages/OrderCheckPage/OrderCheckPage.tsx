import { CartItemProps } from '../../../types/cartItem';
import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import { Back } from '../../../assets';
import { useNavigate } from 'react-router';
import { TEXT } from '../../../constants/text';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import OrderCartItem from '../../../components/CartItem/OrderCartItem';
import DeliverInfo from '../../../components/DeliverInfo/DeliverInfo';
import CartPriceCouponInfo from '../../../components/CartPriceInfo/CartPriceCouponInfo';
import { useCartContext } from '../../../context/CartContext';
import { useState } from 'react';
import CouponModal from '../../../components/CouponModal/CouponModal';
import Button from '../../../components/common/Button/Button';
import Text from '../../../components/common/Text/Text';
import { OrderCheckCartListStyle } from './OrderCheckPage.styles';
import useCouponList from '../../../hooks/useCouponList';
import useValidateCoupon from '../../../hooks/useValidateCoupon';

function OrderCheck() {
  const navigate = useNavigate();

  const cart = useCartContext();
  const { couponList } = useCouponList();

  const selectedCartItems = cart.data?.filter((item: CartItemProps) =>
    cart.selectedItems.includes(item.id)
  );

  const { availableCouponList } = useValidateCoupon(
    couponList,
    cart.subTotal,
    selectedCartItems
  );

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const typeCount = cart.selectedItems.length;
  const totalCount = selectedCartItems.reduce(
    (acc: number, curr: CartItemProps) => {
      return acc + curr?.quantity;
    },
    0
  );
  const deliveryFee = isChecked ? cart.deliveryFee + 3000 : cart.deliveryFee;

  const handleCouponButtonClick = () => {
    setIsCouponModalOpen(true);
  };

  const handleCouponModalClose = () => {
    setIsCouponModalOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
        <ul css={OrderCheckCartListStyle}>
          {selectedCartItems.map((item: CartItemProps) => (
            <OrderCartItem key={item.id} item={item} />
          ))}
        </ul>
        <Button
          color="white"
          variant="secondary"
          onClick={handleCouponButtonClick}
        >
          <Text varient="body">쿠폰 적용</Text>
        </Button>
        <DeliverInfo
          isChecked={isChecked}
          onCheckboxChange={handleCheckboxChange}
        />
        <CartPriceCouponInfo
          subTotal={cart.subTotal}
          deliveryFee={deliveryFee}
          totalBeforeDiscount={cart.totalBeforeDiscount}
        />
      </ContainerLayout>
      <Button color="black" variant="primary" onClick={() => {}}>
        <Text varient="body">결제하기</Text>
      </Button>
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={handleCouponModalClose}
        availableCouponList={availableCouponList}
      />
    </>
  );
}

export default OrderCheck;
