import { CartItemProps } from '../../types/cartItem';
import Header from '../../components/common/Header/Header';
import HeaderButton from '../../components/common/Header/HeaderButton';
import { Back } from '../../assets';
import ContainerLayout from '../../components/common/ContainerLayout/ContainerLayout';
import Text from '../../components/common/Text/Text';
import { useLocation } from 'react-router';
import {
  OrderCheckContainerStyle,
  orderPriceContainerStyle,
} from './OrderCheck.styles';
import PayButton from '../../components/PayButton/PayButton';

function OrderCheck() {
  const { cartData, totalPrice } = useLocation().state as {
    cartData: CartItemProps[];
    totalPrice: number;
  };
  const totalProductQuantity = cartData.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  return (
    <>
      <Header>
        <HeaderButton src={Back} onClick={() => {}} />
      </Header>
      <ContainerLayout>
        <div css={OrderCheckContainerStyle}>
          <Text varient="title">주문 확인</Text>
          <div>
            <Text varient="caption">
              총 {cartData.length}종류의 상품 {totalProductQuantity}개를
              주문합니다.
            </Text>
            <Text varient="caption">최종 결제 금액을 확인해 주세요.</Text>
          </div>
          <div css={orderPriceContainerStyle}>
            <Text varient="body">총 결제 금액</Text>
            <Text varient="title">{totalPrice.toLocaleString()}원</Text>
          </div>
        </div>
      </ContainerLayout>
      <PayButton />
    </>
  );
}

export default OrderCheck;
