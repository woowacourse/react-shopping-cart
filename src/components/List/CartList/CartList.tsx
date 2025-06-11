import Text from '../../@common/Text/Text';
import ListContainer from '../ListContainer';
import List from '../List';

import { CartListCheckboxStyle, CartListHeaderStyle } from './CartList.styles';

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
    <ListContainer>
      <div css={CartListHeaderStyle}>
        <input
          css={CartListCheckboxStyle}
          type="checkbox"
          checked={isAllSelected}
          onChange={handleSelectedAllItems}
        />
        <Text variant="caption">전체 선택</Text>
      </div>
      <List>{children}</List>
    </ListContainer>
  );
}

export default CartList;
