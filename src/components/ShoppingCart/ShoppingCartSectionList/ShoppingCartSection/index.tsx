import { VFC } from 'react';
import { CartItem } from '../../../../types';
import ShoppingCartItem from './ShoppingCartItem';
import List from '../../../shared/List';
import { InnerTitle } from './style';
import useCart from '../../../../service/hooks/useCart';

interface Props {
  title: string;
  items: CartItem[];
}

const ShoppingCartSection: VFC<Props> = ({ title, items }) => {
  const { changeQuantity, deleteItem, changeChecked } = useCart();

  return (
    <section>
      <InnerTitle>
        {title} ({items.length}개)
      </InnerTitle>
      <List>
        {items.map((item) => (
          <ShoppingCartItem
            key={item.cartId}
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
