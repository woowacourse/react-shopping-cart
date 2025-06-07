import { useState } from 'react';
import { CartItemType } from '../../cart/types';
import OrderItem from '../orderItem/OrderItem';
import * as S from './OrderList.styles';
import CouponModal from '../couponModal/CouponModal';

interface OrderListProps {
  products: CartItemType[];
}

function OrderList({ products }: OrderListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);
  return (
    <S.Container>
      {products.map((product) => (
        <OrderItem key={product.id} {...product} />
      ))}
      <S.CouponButton onClick={toggleModal}>쿠폰 적용</S.CouponButton>
      {isOpen && <CouponModal onClose={toggleModal} />}
    </S.Container>
  );
}

export default OrderList;
