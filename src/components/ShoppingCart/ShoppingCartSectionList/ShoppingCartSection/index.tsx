import { VFC } from 'react';
import { ItemInCart } from '../../../../types';
import ShoppingCartItem from './ShoppingCartItem';
import List from '../../../shared/List';
import { InnerTitle } from './style';

interface Props {
  title: string;
  items: ItemInCart[];
}

const ShoppingCartSection: VFC<Props> = ({ title, items }) => {
  return (
    <section>
      <InnerTitle>
        {title} ({items.length}개)
      </InnerTitle>
      <List>
        {items.map((item) => (
          <ShoppingCartItem key={item.id} product={item} />
        ))}
      </List>
    </section>
  );
};

export default ShoppingCartSection;
