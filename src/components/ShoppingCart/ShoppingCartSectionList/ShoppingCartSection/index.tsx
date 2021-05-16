import { VFC } from 'react';
import { ItemInCart } from '../../../../types';
import ShoppingCartItem from './ShoppingCartItem';
import List from '../../../shared/List';
import { InnerTitle } from './style';
import useFetchCartRedux from '../../../../hooks/useFetchCartRedux';

interface Props {
  title: string;
  items: ItemInCart[];
}

const ShoppingCartSection: VFC<Props> = ({ title, items }) => {
  const { changeQuantity, deleteItem, changeChecked } = useFetchCartRedux();

  return (
    <section>
      <InnerTitle>
        {title} ({items.length}개)
      </InnerTitle>
      <List>
        {items.map((item) => (
          <ShoppingCartItem
            key={item.id}
            item={item}
            changeQuantity={changeQuantity}
            changeChecked={changeChecked}
            deleteItem={deleteItem}
          />
        ))}
      </List>
    </section>
  );
};

export default ShoppingCartSection;
