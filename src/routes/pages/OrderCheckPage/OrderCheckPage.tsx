import { CartItemProps } from '../../../types/cartItem';
import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import { Back } from '../../../assets';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import Text from '../../../components/common/Text/Text';
import { useLocation, useNavigate } from 'react-router';
import {
  OrderCheckContainerStyle,
  orderPriceContainerStyle,
} from './OrderCheckPage.styles';
import PayButton from '../../../components/PayButton/PayButton';
import { TEXT } from '../../../constants/text';

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

  return (
    <>
      <Header>
        <HeaderButton src={Back} onClick={() => navigate(-1)} />
      </Header>
      <ContainerLayout>
        <div css={OrderCheckContainerStyle}>
          <Text varient="title">{TEXT.ORDER_CHECK}</Text>
          <div>
            <Text varient="caption">
              총 {selectedCartData.length}종류의 상품 {totalProductQuantity}개를
              주문합니다.
            </Text>
            <Text varient="caption">{TEXT.TOTAL_PRICE_CHECK_MESSAGE}</Text>
          </div>
          <div css={orderPriceContainerStyle}>
            <Text varient="body">{TEXT.TOTAL_PRICE}</Text>
            <Text varient="title">{totalPrice.toLocaleString()}원</Text>
          </div>
        </div>
      </ContainerLayout>
      <PayButton />
    </>
  );
}

export default OrderCheck;
