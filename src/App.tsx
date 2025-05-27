import Header from './components/common/header/Header';
import { useEffect, useState } from 'react';
import { baseAPI } from './api/baseAPI';
import { PaginationResponse } from './api/type';
import CartContents from './components/features/cart/cartContents/CartContents';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const getCartItems = async () => {
      const data = await baseAPI<PaginationResponse<CartItem>>({
        method: 'GET',
        path: 'cart-items?page=0&size=20',
      });

      if (data) setCartItems(data.content);
    };

    getCartItems();
  }, []);

  return (
    <>
      <Header title="SHOP" showBackButton={true} />
      <CartContents />
      {cartItems.map((cartItem) => (
        <div>{cartItem.id}</div>
      ))}
    </>
  );
}

export default App;
