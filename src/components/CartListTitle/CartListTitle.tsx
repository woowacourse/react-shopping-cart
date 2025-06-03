import Text from '../common/Text/Text';
import { CartListTitleStyle } from './CartListTitle.styles';

function CartListTitle({ count }: { count: number }) {
  return (
    <div css={CartListTitleStyle}>
      <Text varient="title">장바구니</Text>
      {count > 0 && (
        <Text varient="caption">{`현재 ${count}종류의 상품이 담겨있습니다.`}</Text>
      )}
    </div>
  );
}

export default CartListTitle;
