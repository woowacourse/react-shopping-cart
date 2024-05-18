import { CartItemData } from '@/types';
import CartItem from './CartItem';
import AllSelectCheckBox from './AllSelectCheckBox';

interface Props {
  cartItems: CartItemData[];
}

export default function CartList({ cartItems }: Props) {
  return (
    <>
      <AllSelectCheckBox />

      <ul>
        {cartItems.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              quantity={cartItem.quantity}
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
