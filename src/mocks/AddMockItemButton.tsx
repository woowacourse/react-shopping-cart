import { postCartItem } from "@/auth/apis/cart";

const AddMockItemButton = () => {
  const mockData = [
    { productId: 2, quantity: 2 },
    { productId: 3, quantity: 2 },
    { productId: 10, quantity: 2 },
    { productId: 11, quantity: 2 },
    { productId: 12, quantity: 2 },
  ];

  const onAddItems = () => {
    mockData.forEach((item) => {
      const { productId, quantity } = item;
      postCartItem({ productId, quantity });
    });
  };

  return <button onClick={onAddItems}>상품 추가</button>;
};

export default AddMockItemButton;
