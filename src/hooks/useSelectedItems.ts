import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { SelectedCartItem, selectedCartItems } from '../recoil/atoms';
import intersectionByProperty from '../utils/getArrayIntersection';
import { CartItem } from '../types/cartItem';

const useSelectedItems = (data: CartItem[]) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);

  useEffect(() => {
    if (data.length !== 0) {
      const newDataState = data.map(item => ({
        cartItemId: item.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      setSelectedItems(prev => getIntersectionForMaintainingSelectState([...prev], newDataState));
    }
  }, [data, setSelectedItems]);

  // 전 상태와 현 상태를 비교해서 선택 상태를 유지하는 함수
  const getIntersectionForMaintainingSelectState = (
    prevState: SelectedCartItem[],
    newDataState: SelectedCartItem[],
  ) => {
    const intersection = intersectionByProperty<SelectedCartItem>(
      prevState,
      newDataState,
      'cartItemId',
    );

    return intersection;
  };

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
          quantity: cartItem.quantity,
        },
      ]);
    }
  };

  return {
    selectedItems,
    onCheckboxClick,
    isSelected,
  };
};

export default useSelectedItems;
