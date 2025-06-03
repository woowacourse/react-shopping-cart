import ListContainer from '../ListContainer';
import List from '../List';

function OrderList({ children }: { children: React.ReactNode }) {
  return (
    <ListContainer>
      <List>{children}</List>
    </ListContainer>
  );
}

export default OrderList;
