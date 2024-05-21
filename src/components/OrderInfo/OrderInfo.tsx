import ShoppingCartDescription from '../ShoppingCartDescription/ShoppingCartDescription';
import * as S from './styled';
import ShoppingCartItemView from '../ShoppingCartItemView/ShoppingCartItemView';
import { useLocation } from 'react-router-dom';
import { CartItem } from '../../types/cartItem';

interface OrderInfoState {
  orderItems: CartItem[];
  kindCount: number;
  productCount: number;
  totalPrice: number;
}

const OrderInfo = () => {
  const location = useLocation();
  const orderInfo = location.state as OrderInfoState | null;

  return (
    <S.Container>
      <ShoppingCartDescription
        title="주문 확인"
        descriptionShowingCondition={true}
        description={`총 ${orderInfo?.kindCount}종류의 상품 ${orderInfo?.productCount}개를 주문합니다.
최종 결제 금액을 확인해 주세요.`}
      />
      {orderInfo?.orderItems.map(item => <ShoppingCartItemView cartItem={item} />)}
    </S.Container>
  );
};

export default OrderInfo;
