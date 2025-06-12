import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import CartHeader from '../components/Cart/CartHeader';
import CartMain from '../components/Cart/CartMain';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import { useCart } from '../hooks/useCart';

function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    checkedItems,
    setCheckedItems,
    isAllChecked,
    checkAll,
    price,
    totalCount,
    shippingFee,
    totalPrice,
    descriptionMessage,
    isDisabled,
    selectedProducts,
  } = useCart();

  if (!cartItems) {
    return null;
  }

  return (
    <>
      <Header title="SHOP" />
      <Container>
        <CartHeader title="장바구니" description={descriptionMessage} />
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
            state: {
              products: selectedProducts,
              price: price,
              count: checkedItems.length,
              totalCount: totalCount,
              shippingFee: shippingFee,
              totalPrice: totalPrice,
            },
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
