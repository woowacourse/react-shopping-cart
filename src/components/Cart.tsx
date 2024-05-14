import React from 'react';
import { CartItem } from '../types/CartItem';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (cartItemId: number) => void;
}

function Cart({ items, onRemoveItem }: CartProps) {
  return (
    <div>
      <h2>장바구니</h2>
      {items.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.product.name} - {item.product.price}원 ({item.quantity}개)
              <button onClick={() => onRemoveItem(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
