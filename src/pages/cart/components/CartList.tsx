import CartItem from './CartItem';
import AllSelectCheckBox from './AllSelectCheckBox';
import { allCartItemStates } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

export default function CartList() {
  const cartItems = useRecoilValue(allCartItemStates);

  return (
    <>
      <AllSelectCheckBox />
      <ul>
        {cartItems.map((cartItem) => {
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
