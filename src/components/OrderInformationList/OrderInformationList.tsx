import { SelectedCartItem } from '../../recoil/atoms';
import OrderItem from '../OrderItem/OrderItem';
import * as S from './styled';

interface ShoppingCartListProps {
  selectedItems: SelectedCartItem[];
}

const OrderInformationList = ({ selectedItems }: ShoppingCartListProps) => {
  return (
    <S.Container>
      {selectedItems.map(selectedItem => (
        <OrderItem key={selectedItem.cartItemId} selectedItem={selectedItem} />
      ))}
    </S.Container>
  );
};

export default OrderInformationList;
