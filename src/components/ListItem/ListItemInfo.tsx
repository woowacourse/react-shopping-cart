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
      <Text varient="caption">{name}</Text>
      <Text varient="title">{price.toLocaleString()}원</Text>
      {children}
    </div>
  );
}

export default ListItemInfo;
