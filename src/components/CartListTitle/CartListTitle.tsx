import Text from '../common/Text/Text';
import { CartListTitleStyle } from './CartListTitle.styles';

function CartListTitle() {
  return (
    <div css={CartListTitleStyle}>
      <Text varient="title">장바구니</Text>
      <Text varient="caption">현재 2종류의 상품이 담겨있습니다.</Text>
    </div>
  );
}

export default CartListTitle;
