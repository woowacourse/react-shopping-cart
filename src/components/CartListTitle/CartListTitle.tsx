import Text from '../common/Text/Text';
import { CartListTitleStyle } from './CartListTitle.styles';

function CartListTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div css={CartListTitleStyle}>
      <Text varient="title">{title}</Text>
      <Text varient="caption" whiteSpace="pre-line" textAlign="left">
        {description}
      </Text>
    </div>
  );
}

export default CartListTitle;
