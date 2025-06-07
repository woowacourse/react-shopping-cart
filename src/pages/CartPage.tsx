import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import CartHeader from '../components/Cart/CartHeader';
import CartMain from '../components/Cart/CartMain';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import { getCartItems } from '../apis/cart';
import { useData } from '../context/DataContext';
import { CartProduct, CartItemsResponse } from '../types/cart';
import { useCartSelection } from '../hooks/useCartSelection';
import { SHIPPING_FEE, SHIPPING_FEE_THRESHOLD } from '../constants/cartConfig';

function CartPage() {
  const { data: cartItems } = useData<CartItemsResponse>({
    fetcher: getCartItems,
    name: 'cartItems',
  });
  const navigate = useNavigate();
  const { checkedItems, setCheckedItems, isAllChecked, checkAll } = useCartSelection(cartItems);

  const price = cartItems?.content
    ? cartItems.content
        .filter((item: CartProduct) => checkedItems.includes(item.id))
        .reduce((sum: number, item: CartProduct) => sum + item.product.price * item.quantity, 0)
    : 0;

  const totalCount = cartItems?.content
    ? cartItems.content
        .filter((item: CartProduct) => checkedItems.includes(item.id))
        .reduce((sum: number, item: CartProduct) => sum + item.quantity, 0)
    : 0;

  const hasItems = checkedItems.length > 0;
  const needsShippingFee = price < SHIPPING_FEE_THRESHOLD;
  const shippingFee = hasItems && needsShippingFee ? SHIPPING_FEE : 0;

  const totalPrice = price + shippingFee;

  if (!cartItems) {
    return null;
  }

  const descriptionMessage = () => {
    if (cartItems.content.length > 0) {
      return `현재 ${cartItems.content.length}종류의 상품이 담겨있습니다.`;
    }
  };

  const isDisabled = checkedItems.length === 0;

  return (
    <>
      <Header title="SHOP" />
      <Container>
        <CartHeader description={descriptionMessage()} />

        {cartItems.content.length > 0 ? (
          <>
            <CartMain
              checked={isAllChecked}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              price={price}
              shippingFee={shippingFee}
              totalPrice={totalPrice}
              onChange={checkAll}
            />
          </>
        ) : (
          <EmptyCart>장바구니에 담은 상품이 없습니다.</EmptyCart>
        )}
      </Container>
      <Button
        disabled={isDisabled}
        onClick={() =>
          navigate('/orderConfirm', {
            state: { price: totalPrice, count: checkedItems.length, totalCount: totalCount },
          })
        }
      >
        주문확인
      </Button>
    </>
  );
}

export default CartPage;

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
