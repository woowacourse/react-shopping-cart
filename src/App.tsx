import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { fetchCartItems } from './apis/cartItem';
import { cartItemsState } from './recoil/cartItems';

function App() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  useEffect(() => {
    const getCartItems = async () => {
      const result = await fetchCartItems();

      setCartItems(result);
    };

    getCartItems();
  }, []);

  return (
    <>
      <div>
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem.id}>{cartItem.product.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
