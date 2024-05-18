import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { SelectedCartItem, selectedCartItems } from '../recoil/atoms';
import intersectionByProperty from '../utils/getArrayIntersection';
import { CartItem } from '../types/cartItem';

const useSelectedItems = (
  data: CartItem[],
  getOneItemQuantity: (id: number) => number | undefined,
) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);

  useEffect(() => {
    if (data.length !== 0) {
      setSelectedItems(prev => {
        const intersection = intersectionByProperty<SelectedCartItem>(
          [...prev],
          data.map(item => ({
            cartItemId: item.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          'cartItemId',
        );

        return intersection;
      });
    }
  }, [data, setSelectedItems]);

  // 현재 selectedItems에서 id가 있는지에 대한 함수
  // id를 받아서 id가 있는지를 boolean

  const isSelected = (id: number) => {
    return selectedItems.find(item => item.cartItemId === id) !== undefined;
  };

  // checkbox의 onClick handler
  // cartItem params
  // cartItems id selectedItems 배열에 있으면 제거
  // cartItems id selectedItems 배열에 없으면 추가

  const onCheckboxClick = (cartItem: CartItem) => {
    const isSelectedItem = isSelected(cartItem.id);

    if (isSelectedItem) {
      setSelectedItems(prev => prev.filter(item => item.cartItemId !== cartItem.id));
    } else {
      setSelectedItems(prev => [
        ...prev,
        {
          cartItemId: cartItem.id,
          price: cartItem.product.price,
          quantity: getOneItemQuantity(cartItem.id) ?? cartItem.quantity,
        },
      ]);
    }
  };

  // 전체선택을 눌렀을 때 선택 해제와 전체 선택을 해주는 기능
  // 장바구니가 담긴 요소들이 모두 선택된다면 전체선택 활성화

  const selectedItemQuantity = (cartItem: CartItem, newQuantity: number) => {
    const selectedItemIndex = selectedItems.findIndex(item => item.cartItemId === cartItem.id);

    if (selectedItemIndex !== -1) {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[selectedItemIndex] = {
        ...updatedSelectedItems[selectedItemIndex],
        quantity: newQuantity,
      };
      setSelectedItems(updatedSelectedItems);
    }
  };

  return {
    selectedItems,
    onCheckboxClick,
    isSelected,
    selectedItemQuantity,
  };
};

export default useSelectedItems;
