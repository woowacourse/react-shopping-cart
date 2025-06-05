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

  const handleAllSelected = () => {
    if (isAllChecked) {
      setSelectedCartId([]);
      return;
    }
    setSelectedCartId(cartItems?.map((item) => item.id) || []);
  };

  const handleToggle = (id: number) => {
    // 선택이 안되어 있음 -> 선택됨
    if (!selectedCartId?.find((item) => item === id)) {
      setSelectedCartId((prev) => [...prev, id]);
      return;
    }
    // 선택이 되어 있음 -> 선택안됨
    setSelectedCartId(selectedCartId?.filter((cartId) => cartId !== id));
  };

  const handleRemove = (id: number) => {
    if (!selectedCartId?.find((item) => item === id)) return;
    setSelectedCartId(selectedCartId?.filter((cartId) => cartId !== id));
  };

  useEffect(() => {
    if (cartItems && !isSetting.current) {
      const cartIdList = cartItems?.map((item) => item.id);
      setSelectedCartId(cartIdList);
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
