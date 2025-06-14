import Text from '../@common/Text/Text';

import { ItemInfo } from './ListItem.styles';

function ListItemInfo({
  children,
  name,
  price,
}: {
  children: React.ReactNode;
  name: string;
  price: number;
}) {
  return (
    <div css={ItemInfo}>
      <Text variant="caption">{name}</Text>
      <Text variant="title">{price.toLocaleString()}원</Text>
      {children}
    </div>
  );
}

export default ListItemInfo;
