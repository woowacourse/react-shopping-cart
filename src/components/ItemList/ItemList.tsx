// recoil
//api 요청
//

import { CartItem } from '../../type';

interface ItemList {
  cartItem: CartItem[];
}

const ItemList = ({ cartItem }: ItemList) => {
  return (
    <div>
      {cartItem.map((cart) => {
        return (
          <li key={cart.id}>
            <img src={cart.product.imageUrl} />
            {cart.product.name} - {cart.product.price}원 ({cart.quantity}개)
          </li>
        );
      })}
    </div>
  );
};

export default ItemList;
