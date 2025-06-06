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

function OrderCheck() {
  const navigate = useNavigate();
  // 1. 상품 종류와 총 개수 상태 세팅하기
  // 1) 종류 개수 : typeCount
  // - 체크된 id 개수 (selectedItems 필요)
  // 2) 총 개수 : totalCount
  // - 체크된 id의 상품 개수 (cartList, selectedItems 필요)
  const cartList = getLocalStorage('cartList');
  const selectedItems = getLocalStorage('selectedItems');

  const typeCount = selectedItems.length; //
  const totalCount = selectedItems.reduce((acc: number, curr: number) => {
    const findCartItem = cartList.find(
      (item: CartItemProps) => item.id === curr
    );
    return acc + findCartItem?.quantity;
  }, 0);

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
