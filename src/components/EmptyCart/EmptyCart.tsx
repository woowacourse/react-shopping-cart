import Text from '../common/Text/Text';
import { EmptyCartContainerStyle } from './EmptyCart.styles';

function EmptyCart() {
  return (
    <div css={EmptyCartContainerStyle}>
      <Text varient="body">장바구니에 담은 상품이 없습니다.</Text>
    </div>
  );
}

export default EmptyCart;
