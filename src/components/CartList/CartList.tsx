import Text from '../common/Text/Text';
import { CartListCheckboxStyle, CartListHeaderStyle } from './CartList.styles';
import { TEXT } from '../../constants/text';

function CartListHeader({
  allSelected,
  onAllSelectChange,
}: {
  allSelected: boolean;
  onAllSelectChange: () => void;
}) {
  return (
    <div css={CartListHeaderStyle}>
      <input
        css={CartListCheckboxStyle}
        type="checkbox"
        checked={allSelected}
        onChange={onAllSelectChange}
      />
      <Text varient="caption">{TEXT.ALL_SELECT}</Text>
    </div>
  );
}

export default CartListHeader;
