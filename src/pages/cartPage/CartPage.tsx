import * as S from './CartPage.style';
import { Title, Subtitle } from '../../styles/@common/title/Title.styles';
import CartItem from '../../components/features/cartItem/CartItem';
import CartPrice from '../../components/features/cartPrice/CartPrice';

const mockCartData = {
  id: '1',
  product: {
    imageUrl: 'https://via.placeholder.com/150',
    name: '상품1',
    price: 1000,
  },
  quantity: 1,
};

const CartPage = () => {
  return (
    <div css={S.CartPageWrapper}>
      <div css={S.CartTitleContainer}>
        <p css={Title}>장바구니</p>
        <p css={Subtitle}>현재 2종류의 상품이 담겨있습니다.</p>
      </div>
      <CartItem cartData={mockCartData} />
      <CartPrice />
    </div>
  );
};

export default CartPage;
