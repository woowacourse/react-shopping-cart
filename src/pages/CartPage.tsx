import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import CartHeader from '../components/Cart/CartHeader';
import CartList from '../components/Cart/CartList';
import CartFooter from '../components/Cart/CartFooter';
import SelectAllBox from '../components/SelectBox/SelectAllBox';
import { useNavigate } from 'react-router';
import { infoIcon } from '../assets';
import { getCartItems } from '../apis/cart';
import { useData } from '../context/DataContext';
import { CartProduct } from '../types/cart';
import { useCartSelection } from '../hooks/useCartSelection';
import styled from '@emotion/styled';

function CartPage() {
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

  return (
    <>
      <Header title="SHOP" />
      <Container>
        <CartHeader />
        <SelectAllBox isAllChecked={isAllChecked} handleAllCheck={handleAllCheck} />
        <CartList checkedItems={checkedItems} setCheckedItems={setCheckedItems} />

        <CartInfo>
          <InfoIconImage src={infoIcon} alt="infoIcon" />
          <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
        </CartInfo>

        <CartFooter price={price} shippingFee={shippingFee} totalPrice={totalPrice} />
      </Container>
      <Button
        disabled={checkedItems.length === 0}
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

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin: 52px 0 13px 0;
`;

const InfoIconImage = styled.img`
  width: 13px;
  height: 13px;
`;
