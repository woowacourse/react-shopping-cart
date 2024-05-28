import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedCartItems } from '@recoil/atoms';
import intersectionByProperty from '@utils/getArrayIntersection';
import { CartItem } from '@type/cartItem';

const useSelectedItems = (data: CartItem[]) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);

  useEffect(() => {
    if (data.length !== 0) {
      setSelectedItems(prev => getIntersectionForMaintainingSelectState([...prev], data));
    }
  }, [data, setSelectedItems]);

  // 전 상태와 현 상태를 비교해서 선택 상태를 유지하는 함수
  const getIntersectionForMaintainingSelectState = (
    prevState: CartItem[],
    newDataState: CartItem[],
  ) => {
    const intersection = intersectionByProperty<CartItem>(prevState, newDataState, 'id');

    return intersection;
  };

  // 현재 selectedItems에서 id가 있는지에 대한 함수
  // id를 받아서 id가 있는지를 boolean

  const isSelected = (id: number) => {
    return selectedItems.find(item => item.id === id) !== undefined;
  };

  // checkbox의 onClick handler
  // cartItem params
  // cartItems id selectedItems 배열에 있으면 제거
  // cartItems id selectedItems 배열에 없으면 추가

  const onCheckboxClick = (cartItem: CartItem) => {
    const isSelectedItem = isSelected(cartItem.id);

    if (isSelectedItem) {
      setSelectedItems(prev => prev.filter(item => item.id !== cartItem.id));
    } else {
      setSelectedItems(prev => [...prev, cartItem]);
    }
  };

  return {
    selectedItems,
    onCheckboxClick,
    isSelected,
  };
};

export default useSelectedItems;
