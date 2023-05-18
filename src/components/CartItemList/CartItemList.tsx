import { useProductListInCart } from '../../hooks/cartListState/cartListState';
import { FlexColWrapper } from '../../pages/Cart/Cart.style';
import CartItem from '../CartItem/CartItem';

function CartItemList() {
  const productListInCart = useProductListInCart();

  return (
    <FlexColWrapper>
      {productListInCart.map(({ id, imageUrl, name, price }) => {
        return (
          <li key={id}>
            <CartItem id={id} imageUrl={imageUrl} name={name} price={price} />
          </li>
        );
      })}
    </FlexColWrapper>
  );
}

export default CartItemList;
