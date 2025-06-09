import { useNavigate } from 'react-router';
import { getCartItems } from '../../apis/cart';
import { useData } from '../../context/DataContext';
import Button from '../Button/Button';
import Header from '../Header/Header';
import CartHeader from './CartHeader';
import CartMain from './CartMain';
import styled from '@emotion/styled';
import { useCartSelectContext } from '../../context/CartSelectContext';
import { calculateCartPrice } from '../../utils/calculator';

function CartContent() {
  const { data: cartItems } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });
  const navigate = useNavigate();
  const { checkedItems } = useCartSelectContext();
  const { price, shippingFee, totalPrice, hasItems, totalCount } = calculateCartPrice(
    cartItems,
    checkedItems,
  );

  if (!cartItems) {
    return null;
  }

  const descriptionMessage = () => {
    if (cartItems.content.length > 0) {
      return `현재 ${cartItems.content.length}종류의 상품이 담겨있습니다.`;
    }
  };

  return (
    <>
      <Header title="SHOP" />
      <Container>
        <CartHeader title="장바구니" description={descriptionMessage()} />

        {cartItems.content.length > 0 ? (
          <>
            <CartMain price={price} shippingFee={shippingFee} totalPrice={totalPrice} />
          </>
        ) : (
          <EmptyCart>장바구니에 담은 상품이 없습니다.</EmptyCart>
        )}
      </Container>
      <Button
        disabled={!hasItems}
        onClick={() =>
          navigate('/orderConfirm', {
            state: {
              checkedItems,
              totalCount,
            },
          })
        }
      >
        주문확인
      </Button>
    </>
  );
}

export default CartContent;

const Container = styled.div`
  padding: 0 24px;
  height: 100%;
  overflow-y: auto;
`;

const EmptyCart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #0a0d13;
`;
