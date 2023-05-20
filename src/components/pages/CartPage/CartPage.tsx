import { useRecoilValue } from 'recoil';
import CartSingleItem from './CartItem/CartItem';
import cartState, { totalPriceSelector } from '../../../recoil/cartState';
import CartAllCheckbox from './CartAllCheckbox/CartAllCheckbox';
import DeleteSelectedButton from './DeleteSelectedButton/DeleteSelectedButton';

const CartPage = () => {
  const data = useRecoilValue(cartState);

  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <>
      <p>{totalPrice}</p>
      {Object.values(data).map(({ id, quantity, product: { name, price, imageUrl } }) => (
        <CartSingleItem
          key={id}
          id={id}
          quantity={quantity}
          price={price}
          imageUrl={imageUrl}
          name={name}
        />
      ))}
      <CartAllCheckbox />
      <DeleteSelectedButton />
    </>
  );
};

export default CartPage;
