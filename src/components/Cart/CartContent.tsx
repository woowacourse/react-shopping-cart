import { useNavigate } from 'react-router';
import { getCartItems } from '../../apis/cart';
import { useData } from '../../context/DataContext';
import { useCartSelection } from '../../hooks/useCartSelection';
import { CartProduct } from '../../types/cart';
import Button from '../Button/Button';
import Header from '../Header/Header';
import CartHeader from './CartHeader';
import CartMain from './CartMain';
import styled from '@emotion/styled';

function CartContent() {
  const { data: cartItems } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });
  const navigate = useNavigate();
  const { checkedItems, setCheckedItems, isAllChecked, handleAllCheck } =
    useCartSelection(cartItems);

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
  const needsShippingFee = price < 100000;
  const shippingFee = hasItems && needsShippingFee ? 3000 : 0;

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
              isAllChecked={isAllChecked}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              price={price}
              shippingFee={shippingFee}
              totalPrice={totalPrice}
              handleAllCheck={handleAllCheck}
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
