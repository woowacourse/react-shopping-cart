import Button from '../Button/Button';
import Header from '../Header/Header';
import styled from '@emotion/styled';
import CartHeader from '../Cart/CartHeader';
import { useNavigate } from 'react-router';
import OrderMain from './OrderMain';
import { useOrder } from '../../context/OrderContext';
import { useCoupon } from '../../context/CouponContext';
import { useShipping } from '../../context/ShippingContext';

function OrderContent() {
  const { selectedCartItems, price } = useOrder();
  const { totalDiscount } = useCoupon();
  const { calculateShippingFee } = useShipping();
  const navigate = useNavigate();

  const descriptionMessage = () => {
    if (selectedCartItems.length > 0) {
      const totalCount = selectedCartItems.reduce(
        (sum, selectedCartItem) => sum + selectedCartItem.quantity,
        0,
      );
      return (
        <>
          총 {selectedCartItems.length}종류의 상품 {totalCount}
          개를 주문합니다.
          <br />
          최종 결제 금액을 확인해주세요.
        </>
      );
    }
  };
  return (
    <>
      <Header variant="back" />
      <Container>
        <CartHeader title="주문 확인" description={descriptionMessage()} />
        <OrderMain />
      </Container>
      <Button
        disabled={false}
        onClick={() =>
          navigate('/paymentConfirm', {
            state: {
              count: selectedCartItems.length,
              totalCount: selectedCartItems.reduce(
                (sum, selectedCartItem) => sum + selectedCartItem.quantity,
                0,
              ),
              price: price - totalDiscount + calculateShippingFee(price, false),
            },
          })
        }
      >
        결제하기
      </Button>
    </>
  );
}

export default OrderContent;

const Container = styled.div`
  padding: 0 24px;
  height: 100%;
  overflow-y: auto;
`;
