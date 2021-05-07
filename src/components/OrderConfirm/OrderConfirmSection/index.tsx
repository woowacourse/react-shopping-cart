import { VFC } from 'react';
import { Product } from '../../../../types';
import ShoppingCartItem from './OrderItem';
import List from '../../../shared/List';
import { InnerTitle } from './style';

interface Props {
  title: string;
  items: Product[];
}

const ShoppingCartSection: VFC<Props> = ({ title, items }) => {
  return (
    <section>
      <InnerTitle>
        {title} ({items.length}개)
      </InnerTitle>
      <List>
        {items.map((item) => (
          <ShoppingCartItem product={item} />
        ))}
      </List>
    </section>
  );
};

export default ShoppingCartSection;
