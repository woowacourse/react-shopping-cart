import ItemDescription, { ItemDescriptionType } from '@components/common/Item/ItemDescription/ItemDescription';
import ItemImage, { ItemImageType } from '@components/common/Item/ItemImage/ItemImage';

import * as Styled from './Item.styled';

const Item: React.FC<React.PropsWithChildren> & {
  ItemImage: ItemImageType;
  ItemDescription: ItemDescriptionType;
} = ({ children }) => {
  return (
    <Styled.ItemContainer>
      <Styled.ItemDetailContainer>{children}</Styled.ItemDetailContainer>
    </Styled.ItemContainer>
  );
};

export default Item;

Item.ItemImage = ItemImage;
Item.ItemDescription = ItemDescription;
