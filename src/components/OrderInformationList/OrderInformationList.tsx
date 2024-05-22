import { SelectedCartItem } from '../../recoil/atoms';
import OrderedItem from '../OrderedItem/OrderedItem';
import * as S from './styled';

interface ShoppingCartListProps {
  selectedItems: SelectedCartItem[];
}

const OrderInformationList = ({ selectedItems }: ShoppingCartListProps) => {
  return (
    <S.Container>
      {selectedItems.map(selectedItem => (
        <OrderedItem key={selectedItem.cartItemId} selectedItem={selectedItem} />
      ))}
    </S.Container>
  );
};

export default OrderInformationList;
