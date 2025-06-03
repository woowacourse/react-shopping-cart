import Text from '../common/Text/Text';
import { CartListTitleStyle } from './CartListTitle.styles';
import { TEXT } from '../../constants/text';

function CartListTitle({ count }: { count: number }) {
  return (
    <div css={CartListTitleStyle}>
      <Text varient="title">{TEXT.CART_TITLE}</Text>
      {count > 0 && (
        <Text varient="caption">{`현재 ${count}종류의 상품이 담겨있습니다.`}</Text>
      )}
    </div>
  );
}

export default CartListTitle;
