import { VFC } from 'react';
import { Product } from '../../../../types';
import ShoppingCartItem from './ShoppingCartItem';
import { InnerTitle, ItemList } from './style';

interface Props {
  title: string;
  items: Product[];
}

const ShoppingCartSection: VFC<Props> = ({ title, items }) => {
  return (
    <section>
      <InnerTitle>든든배송 상품 ({items.length}개)</InnerTitle>
      <ItemList>
        {items.map((item) => (
          <ShoppingCartItem product={item} />
        ))}
      </ItemList>
    </section>
  );
};

export default ShoppingCartSection;
