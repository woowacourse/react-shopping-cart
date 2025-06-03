import Text from '../common/Text/Text';
import { EmptyCartContainerStyle } from './EmptyCart.styles';
import { TEXT } from '../../constants/text';

function EmptyCart() {
  return (
    <div css={EmptyCartContainerStyle}>
      <Text varient="body">{TEXT.NO_PRODUCT}</Text>
    </div>
  );
}

export default EmptyCart;
