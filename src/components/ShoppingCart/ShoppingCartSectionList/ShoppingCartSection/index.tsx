import { FC } from 'react';
import { CartItem } from '../../../../types';
import ShoppingCartItem from './ShoppingCartItem';
import List from '../../../shared/List';
import { InnerTitle } from './style';
import useCartDeleteItem from '../../../../hooks/useCartItems/useCartDeleteItem';
import useCartChangeCheckState from '../../../../hooks/useCartItems/useCartChangeCheckState';
import useCartChangeQuantity from '../../../../hooks/useCartItems/useCartChangeQuantity';
import PropTypes from 'prop-types';

interface Props {
  title: string;
  items: CartItem[];
}

const ShoppingCartSection: FC<Props> = ({ title, items }) => {
  const { changeQuantity } = useCartChangeQuantity();
  const { deleteItem } = useCartDeleteItem();
  const { toggleChecked } = useCartChangeCheckState();

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
            toggleChecked={toggleChecked}
            deleteItem={deleteItem}
          />
        ))}
      </List>
    </section>
  );
};

export default ShoppingCartSection;

ShoppingCartSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      checked: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
};
