import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import Text from '../../../components/common/Text/Text';
import { useNavigate } from 'react-router';
import { TEXT } from '../../../constants/text';
import {
  OrderCheckContainerStyle,
  OrderPriceContainerStyle,
} from './OrderCompletePage.styles';
import Button from '../../../components/common/Button/Button';

function OrderCompletePage() {
  const navigate = useNavigate();

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
              총 {'[동적 종류 필요]'}종류의 상품 {'[동적 개수 필요]'}개를
              주문합니다.
            </Text>
            <Text varient="caption">{TEXT.TOTAL_PRICE_CHECK_MESSAGE}</Text>
          </div>
          <div css={OrderPriceContainerStyle}>
            <Text varient="body">{TEXT.TOTAL_PRICE}</Text>
            <Text varient="title">{'[동적 금액 필요]'}원</Text>
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
