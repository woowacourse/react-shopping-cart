import { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { KEY_CART } from '../../constants';
import CartPage from '../../pages/CartPage';
import { setDataInLocalStorage } from '../../utils/getAndSetDataInLocalStorage';

const meta = {
  component: CartPage,
  title: 'Pages/CartPage',
} satisfies Meta<typeof CartPage>;

export default meta;

export const Cart = () => {
  useEffect(() => {
    const cart = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: 'PET보틀-정사각(420ml)',
          price: 43400,
          imageUrl: '/assets/product1.svg',
        },
      },
    ];

    setDataInLocalStorage(KEY_CART, cart);
  }, []);

  return (
    <div style={{ width: '1270px' }}>
      <CartPage />
    </div>
  );
};
