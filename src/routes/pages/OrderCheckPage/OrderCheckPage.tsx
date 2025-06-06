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
import { getLocalStorage } from '../../../utils/localStorage';
import { useCartListContext } from '../../../context/CartListContext';

function OrderCheck() {
  const navigate = useNavigate();

  const { data: cartList } = useCartListContext();
  const selectedItems = getLocalStorage('selectedItems');
  const selectedCartItems = cartList?.filter((item: CartItemProps) =>
    selectedItems.includes(item.id)
  );

  const typeCount = selectedItems.length;
  const totalCount = selectedCartItems.reduce(
    (acc: number, curr: CartItemProps) => {
      return acc + curr?.quantity;
    },
    0
  );

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
        <CouponButton />
        <DeliverInfo />
        <CartPriceCouponInfo />
      </ContainerLayout>
      <PayButton />
    </>
  );
}

export default OrderCheck;
