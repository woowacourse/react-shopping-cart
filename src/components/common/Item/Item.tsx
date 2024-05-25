import ItemDescription, { ItemDescriptionType } from '@components/common/Item/ItemDescription/ItemDescription';
import ItemImage, { ItemImageType } from '@components/common/Item/ItemImage/ItemImage';
import ItemSelection from '@components/common/Item/ItemSelection/ItemSelection';

import * as Styled from './Item.styled';

interface ItemProps {
  direction?: React.CSSProperties['flexDirection'];
}

const Item: React.FC<React.PropsWithChildren<ItemProps>> & {
  ItemImage: ItemImageType;
  ItemDescription: ItemDescriptionType;
  ItemSelection: React.FC<React.PropsWithChildren>;
} = ({ children, direction = 'row' }) => {
  return (
    <Styled.ItemContainer>
      <Styled.ItemDetailContainer $direction={direction}>{children}</Styled.ItemDetailContainer>
    </Styled.ItemContainer>
  );
};

export default Item;

Item.ItemImage = ItemImage;
Item.ItemDescription = ItemDescription;
Item.ItemSelection = ItemSelection;
