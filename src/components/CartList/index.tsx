import { styled } from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import useAtomLocalStorage from '@hooks/useAtomLocalStorage';
import { CartInformation } from '@type/types';
import { CART_LIST_LOCAL_KEY } from '@constants';
import CartItem from './CartItem';

const CartList = () => {
  const [cart, setCart] = useAtomLocalStorage<CartInformation[]>(
    cartAtom,
    CART_LIST_LOCAL_KEY
  );

  return (
    <CartListWrapper>
      {cart &&
        cart.map((product) => {
          return (
            <>
              <hr />
              <CartItem
                key={product.id}
                id={product.product.id}
                name={product.product.name}
                imageUrl={product.product.imageUrl}
                quantity={product.quantity}
                price={product.product.price}
              />
            </>
          );
        })}
    </CartListWrapper>
  );
};

const CartListWrapper = styled.div`
  width: 55%;
  border-top: 4px solid #aaaaaa;
`;

export default CartList;
