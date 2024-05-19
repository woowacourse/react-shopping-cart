import { useRecoilState } from 'recoil';
import { itemQuantityState } from '../recoil/atoms';
import { useEffect } from 'react';
import { CartItem } from '../api/get/getItems';

const useItemQuantity = (cartItems: CartItem[]) => {
  const [quantity, setQuantity] = useRecoilState(itemQuantityState);

  useEffect(() => {
    setQuantity(
      cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
    );
  }, [cartItems, setQuantity]);

  // 특정 아이템의 quantity를 불러오는 함수
  const getOneItemQuantity = (id: number) => {
    const oneItem = quantity.find(item => item.id === id);
    return oneItem?.quantity;
  };

  // 특정 아이템의 quantity를 수정하는 함수
  const setOneItemQuantity = (id: number, newQuantity: number) => {
    setQuantity(quantity.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  return {
    getOneItemQuantity,
    setOneItemQuantity,
  };
};

export default useItemQuantity;
