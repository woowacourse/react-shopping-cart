import { CartItemProps } from '../../../types/cartItem';
import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import { Back } from '../../../assets';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import Text from '../../../components/common/Text/Text';
import { useLocation, useNavigate } from 'react-router';
// import {
//   OrderCheckContainerStyle,
//   orderPriceContainerStyle,
// } from './OrderCheck.styles';
import PayButton from '../../../components/PayButton/PayButton';
import PageTitle from '../../../components/PageTitle/PageTitle';

function OrderCheck() {
  const navigate = useNavigate();
  const { selectedCartData, totalPrice } = useLocation().state as {
    selectedCartData: CartItemProps[];
    totalPrice: number;
  };
  const totalProductQuantity = selectedCartData.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  const deliveryFee = totalPrice >= 100000 ? 0 : 3000;
  const totalPriceWithDeliveryFee = totalPrice + deliveryFee;

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
      </ContainerLayout>
      <PayButton />
    </>
  );
}

export default OrderCheck;
