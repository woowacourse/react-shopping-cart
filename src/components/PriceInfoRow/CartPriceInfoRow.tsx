import { CartPriceInfoStyle } from '../CartPriceInfo/CartPriceInfo.styles';
import Text from '../common/Text/Text';

const CartPriceInfoRow = ({
  title,
  price,
}: {
  title: string;
  price: number;
}) => {
  return (
    <div css={CartPriceInfoStyle}>
      <Text varient="body">{title}</Text>
      <Text varient="title">{price.toLocaleString()}원</Text>
    </div>
  );
};

export default CartPriceInfoRow;
