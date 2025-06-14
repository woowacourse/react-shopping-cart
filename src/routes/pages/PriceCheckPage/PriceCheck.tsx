import { useLocation } from 'react-router';

import Header from '../../../components/@common/Header/Header';
import ContainerLayout from '../../../components/@common/ContainerLayout/ContainerLayout';
import Text from '../../../components/@common/Text/Text';
import BackToCartButton from '../../../components/BackToCartButton/BackToCartButton';

import { PriceCheckPageStyle } from './PriceCheck.styles';

function PriceCheck() {
  const { orderItemsQuantity, productTypeCount, orderPrice } = useLocation()
    .state as {
    orderItemsQuantity: number;
    productTypeCount: number;
    orderPrice: number;
  };

  return (
    <>
      <Header />
      <ContainerLayout>
        <div css={PriceCheckPageStyle}>
          <Text variant="title">결제 확인</Text>
          <div>
            <Text variant="caption">
              {productTypeCount}종류의 상품 {orderItemsQuantity}개를
              주문했습니다.
            </Text>
            <Text variant="caption">최종 결제 금액을 확인해 주세요.</Text>
          </div>

          <Text variant="subTitle">총 결제 금액</Text>
          <Text variant="title">{orderPrice.toLocaleString()}원</Text>
        </div>
      </ContainerLayout>
      <BackToCartButton />
    </>
  );
}

export default PriceCheck;
