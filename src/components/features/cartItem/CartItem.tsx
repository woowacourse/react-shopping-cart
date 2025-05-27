import { cartItemStyle } from './CartItem.styles';

interface CartItem {
  id: string;
  product: {
    imageUrl: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const CartItem = ({ cartData }: { cartData: CartItem[] }) => {
  return (
    <>
      <div>
        {cartData.map((item) => (
          <div key={item.id} css={cartItemStyle}>
            <img src={item.product.imageUrl} alt={item.product.name} />
            <div>
              <h3>{item.product.name}</h3>
              <p>{item.product.price.toLocaleString()}원</p>
              <p>수량: {item.quantity}개</p>
            </div>
            <button onClick={() => {}}>삭제</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartItem;
