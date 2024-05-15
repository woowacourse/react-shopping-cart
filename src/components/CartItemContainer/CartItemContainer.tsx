import CartItem from '../CartItem/CartItem';

const ITEM_QUANTITY = [
  { id: 12, quantity: 3 },
  { id: 10, quantity: 1 },
];

const CART_ITEM_LIST = [
  {
    id: 12,
    name: '컨버스',
    price: 20000,
    imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
    category: 'fashion',
  },
  {
    id: 10,
    name: '퓨마',
    price: 10000,
    imageUrl: 'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
    category: 'fashion',
  },
];

export default function CartItemContainer() {
  const handleCheckItem = (id: number) => {
    alert(`${id} 상품이 체크되었습니다!`);
  };

  const handleDeleteItem = (id: number) => {
    alert(`${id} 상품에 대한 삭제 버튼이 눌렸습니다!`);
  };

  const handleIncreaseQuantity = (id: number) => {
    alert(`${id} 상품을 하나 더 눌렸습니다!`);
  };

  const handleDecreaseQuantity = (id: number) => {
    alert(`${id} 상품을 하나 줄였습니다!`);
  };

  return (
    <ul>
      {CART_ITEM_LIST.map((item) => {
        return (
          <CartItem
            key={item.id}
            isChecked={true}
            product={item}
            quantity={ITEM_QUANTITY.find(({ id }) => id === item.id)?.quantity ?? 0}
            handleCheck={() => handleCheckItem(item.id)}
            handleDelete={() => handleDeleteItem(item.id)}
            handleIncreaseQuantity={() => handleIncreaseQuantity(item.id)}
            handleDecreaseQuantity={() => handleDecreaseQuantity(item.id)}
          />
        );
      })}
    </ul>
  );
}
