import { Product } from '@appTypes/shoppingCart';
import { formatKoreanCurrency } from '@utils/currency';

import * as Styled from './ItemDescription.styled';

export type ItemDescriptionType = React.FC<React.PropsWithChildren<Pick<Product, 'name' | 'price'>>>;

const ItemDescription: ItemDescriptionType = ({ children, name, price }) => {
  return (
    <Styled.ItemDescriptionWrapper>
      <Styled.ItemDescriptionTitle>{name}</Styled.ItemDescriptionTitle>
      <Styled.ItemDescriptionPrice>{formatKoreanCurrency(price)}</Styled.ItemDescriptionPrice>
      <Styled.ItemQuantityWrapper>{children}</Styled.ItemQuantityWrapper>
    </Styled.ItemDescriptionWrapper>
  );
};

export default ItemDescription;
