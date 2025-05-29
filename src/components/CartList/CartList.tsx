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
  handleSelecedAllItems,
}: {
  children: React.ReactNode;
  isAllSelected: boolean;
  handleSelecedAllItems: () => void;
}) {
  return (
    <div css={CartListContainerStyle}>
      <div css={CartListHeaderStyle}>
        <input
          css={CartListCheckboxStyle}
          type="checkbox"
          checked={isAllSelected}
          onChange={handleSelecedAllItems}
        />
        <Text varient="caption">전체 선택</Text>
      </div>
      <ul css={CartListStyle}>{children}</ul>
    </div>
  );
}

export default CartList;
