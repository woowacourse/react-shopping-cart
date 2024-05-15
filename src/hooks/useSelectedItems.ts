import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedCartItems } from '../recoil/atoms';
import { CartItem } from '../api/get/getItems';

const useSelectedItems = (
  data: CartItem[],
  getOneItemQuantity: (id: number) => number | undefined,
) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);
  const [all, setAll] = useState<boolean>(data.length === selectedItems.length);

  useEffect(() => {
    setAll(data.length === selectedItems.length);
  }, [data, selectedItems.length]);

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

  // 전체선택 state

  const onSelectAllClick = () => {
    if (!all) {
      setSelectedItems(
        data.map(item => ({
          cartItemId: item.id,
          quantity: getOneItemQuantity(item.id) ?? item.quantity,
          price: item.product.price,
        })),
      );
      setAll(true);
    } else {
      setSelectedItems([]);
      setAll(false);
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
    onSelectAllClick,
    all,
    selectedItemQuantity,
  };
};

export default useSelectedItems;
