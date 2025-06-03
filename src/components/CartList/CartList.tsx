import Text from '../common/Text/Text';
import { CartListCheckboxStyle, CartListHeaderStyle } from './CartList.styles';

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
      <Text varient="caption">전체 선택</Text>
    </div>
  );
}

export default CartListHeader;
