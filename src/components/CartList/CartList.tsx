import Text from '../common/Text/Text';
import {
  CartListCheckboxStyle,
  CartListContainerStyle,
  CartListHeaderStyle,
  CartListStyle,
} from './CartList.styles';

function CartList({
  children,
  isAllSelected,
  handleSelectedAllItems,
}: {
  children: React.ReactNode;
  isAllSelected: boolean;
  handleSelectedAllItems: () => void;
}) {
  return (
    <div css={CartListContainerStyle}>
      <div css={CartListHeaderStyle}>
        <input
          css={CartListCheckboxStyle}
          type="checkbox"
          checked={isAllSelected}
          onChange={handleSelectedAllItems}
        />
        <Text varient="caption">전체 선택</Text>
      </div>
      <ul css={CartListStyle}>{children}</ul>
    </div>
  );
}

export default CartList;
