import {useEffect, useRef} from 'react';
import {CartProduct} from '../type/cart';
import {useSelectedCartId} from '../provider/cartItemsProvider';

export const useSelectedCart = (cartItems: CartProduct[] | undefined) => {
  const {selectedCartId, setSelectedCartId} = useSelectedCartId();

  const isSetting = useRef(false);

  const isChecked = (id: number) => {
    return selectedCartId?.some((item) => item === id);
  };

  const isAllChecked = selectedCartId?.length === cartItems?.length;

  const handleUpdate = (cartIdList: number[]) => {
    setSelectedCartId(cartIdList);
    localStorage.setItem('selectedItem', JSON.stringify(cartIdList));
  };

  const handleAllSelected = () => {
    if (isAllChecked) {
      handleUpdate([]);
      return;
    }
    const cartList = cartItems?.map((item) => item.id) || [];
    handleUpdate(cartList);
  };

  const handleToggle = (id: number) => {
    // 선택이 안되어 있음 -> 선택됨
    if (!selectedCartId?.find((item) => item === id)) {
      handleUpdate([...selectedCartId, id]);
      return;
    }
    // 선택이 되어 있음 -> 선택안됨
    const filteredItem = selectedCartId?.filter((cartId) => cartId !== id);
    handleUpdate(filteredItem);
  };

  const handleRemove = (id: number) => {
    if (!selectedCartId?.find((item) => item === id)) return;

    const filteredItem = selectedCartId?.filter((cartId) => cartId !== id);
    handleUpdate(filteredItem);
  };

  useEffect(() => {
    if (cartItems && !isSetting.current) {
      const storedSelectedItem = JSON.parse(
        localStorage.getItem('selectedItem') || '[]'
      );
      if (storedSelectedItem.length > 0) {
        setSelectedCartId(storedSelectedItem);
        return;
      }

      const cartIdList = cartItems?.map((item) => item.id);
      handleUpdate(cartIdList);
      isSetting.current = true;
    }
  }, [cartItems]);

  return {
    isAllChecked,
    isChecked,
    handleAllSelected,
    handleToggle,
    handleRemove,
  };
};
