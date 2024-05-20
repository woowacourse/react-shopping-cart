import CartItem from './CartItem';
import AllSelectCheckBox from './AllSelectCheckBox';
import { useCartContext } from '../context/CartContext';

export default function CartList() {
  const { allCartItems } = useCartContext();

  return (
    <>
      <AllSelectCheckBox />
      <ul>
        {allCartItems.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              name={cartItem.product.name}
              price={cartItem.product.price}
              category={cartItem.product.category}
              imageUrl={cartItem.product.imageUrl}
              isChecked={cartItem.product.isChecked}
            />
          );
        })}
      </ul>
    </>
  );
}
