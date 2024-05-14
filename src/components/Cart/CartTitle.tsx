import { CART_MESSAGE } from '@/constants/message';

const CartTitle = () => {
  const MOCK_NUM = 3;
  return (
    <div>
      <h1>장바구니</h1>
      <p>{CART_MESSAGE.totalProducts(MOCK_NUM)}</p>
    </div>
  );
};
export default CartTitle;
