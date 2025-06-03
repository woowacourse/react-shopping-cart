import { ListStyle } from './List.styles';

function List({ children }: { children: React.ReactNode }) {
  return <ul css={ListStyle}>{children}</ul>;
}

export default List;
