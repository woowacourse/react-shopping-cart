import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import Text from '../../../components/common/Text/Text';
import { TEXT } from '../../../constants/text';
import {
  OrderCheckContainerStyle,
  OrderPriceContainerStyle,
} from './OrderCompletePage.styles';
import Button from '../../../components/common/Button/Button';
import { useCartContext } from '../../../context/CartContext';
import { useLocation } from 'react-router';

function OrderCompletePage() {
  const { typeCount, totalCount } = useCartContext();
  const location = useLocation();
  const { finalPrice } = location.state;

  return (
    <>
      <Header>
        <HeaderButton />
      </Header>
      <ContainerLayout>
        <div css={OrderCheckContainerStyle}>
          <Text varient="title">{TEXT.PAYMENT_COMPLETE}</Text>
          <div>
            <Text varient="caption">
              총 {typeCount}종류의 상품 {totalCount}개를 주문합니다.
            </Text>
            <Text varient="caption">{TEXT.TOTAL_PRICE_CHECK_MESSAGE}</Text>
          </div>
          <div css={OrderPriceContainerStyle}>
            <Text varient="body">{TEXT.TOTAL_PRICE}</Text>
            <Text varient="title">{finalPrice.toLocaleString()}원</Text>
          </div>
        </div>
      </ContainerLayout>
      <Button color="black" variant="primary" onClick={() => {}}>
        <Text varient="body">장바구니로 돌아가기</Text>
      </Button>
    </>
  );
}

export default OrderCompletePage;
