import styled from '@emotion/styled';
import { Flex, Header } from '../../components/common';
import BackArrowButton from '../../components/common/BackArrowButton';
import { useNavigate } from 'react-router-dom';
import { useOrderListContext } from '../shopping-cart/context/OrderListProvider';
import ErrorBoundary from '../../components/features/error-boundary/ErrorBoundary';
import { calculateShippingFee } from '../../utils/calculateShippingFee';

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { cartListData, selectionMap } = useOrderListContext();
  const orderList = (cartListData ?? []).filter(
    (cart) => selectionMap[cart.id] === true
  );
  const typeCount = orderList.length;
  const totalCount = orderList.reduce((acc, cart) => acc + cart.quantity, 0);
  const totalCartPrice = orderList.reduce(
    (acc, cart) => acc + cart.product.price * cart.quantity,
    0
  );
  const shippingFee = calculateShippingFee(totalCartPrice);
  const totalPrice = totalCartPrice + shippingFee;

  return (
    <ErrorBoundary>
      <Header left={<BackArrowButton onClick={handleBackClick} />} />
      <Container>
        <Flex justifyContent='center' alignItems='center' gap='lg'>
          <InfoTitle>주문 확인</InfoTitle>
          <div>
            <Description
              aria-label={`총 ${typeCount}종류의 상품 ${totalCount}개를 주문합니다.`}
            >
              총 {typeCount}종류의 상품 {totalCount}개를 주문합니다.
            </Description>
            <Description>최종 결제 금액을 확인해 확인해 주세요.</Description>
          </div>
          <Subtitle>총 결제 금액</Subtitle>
          <InfoTitle
            aria-label={`총 결제 금액은 ${totalPrice.toLocaleString()}원 입니다.`}
          >
            {totalPrice.toLocaleString()}원
          </InfoTitle>
        </Flex>
      </Container>
      <PayButton $isDisabled={true} disabled>
        결제하기
      </PayButton>
    </ErrorBoundary>
  );
};

export default OrderConfirmPage;

const Container = styled(Flex)`
  padding: 36px 24px;
  height: calc(100vh - 116px);
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 12px;
`;

const PayButton = styled.button<{ $isDisabled: boolean }>`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background-color: ${({ $isDisabled }) => ($isDisabled ? '#BDBDBD' : '#333')};
  color: white;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: 0px;
`;
