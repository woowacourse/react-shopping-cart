import { ListItemStyle } from './ListItem.styles';

function ListItem({ children }: { children: React.ReactNode }) {
  return <li css={ListItemStyle}>{children}</li>;
}

export default ListItem;
