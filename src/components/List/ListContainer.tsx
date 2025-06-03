import { ListContainerStyle } from './List.styles';

function ListContainer({ children }: { children: React.ReactNode }) {
  return <section css={ListContainerStyle}>{children}</section>;
}

export default ListContainer;
