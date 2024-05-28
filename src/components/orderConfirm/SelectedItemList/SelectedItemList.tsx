import { CartItem } from '@appTypes/shoppingCart';
import Item from '@components/common/Item/Item';

import * as Styled from './SelectedItemList.styled';

interface SelectedItemListProps {
  selectedItems: CartItem[];
}

const SelectedItemList: React.FC<SelectedItemListProps> = ({ selectedItems }) => {
  return (
    <>
      {selectedItems.map(({ id, quantity, product }) => (
        <Item key={id}>
          <Item.ItemImage url={product.imageUrl} />
          <Item.ItemDescription name={product.name} price={product.price}>
            <Styled.LabelText>{quantity}개</Styled.LabelText>
          </Item.ItemDescription>
        </Item>
      ))}
    </>
  );
};

export default SelectedItemList;
