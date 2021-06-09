import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAllCheckboxesInCart, toggleCartCheckbox } from '../redux/Cart/actions';
import useUpdateEffect from './useUpdateEffect';

const useCartCheckbox = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const {
    cart: { cartList },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeCheckbox = (cartId) => () => {
    dispatch(toggleCartCheckbox(cartId));
  };

  const changeAllCheckbox = () => {
    dispatch(toggleAllCheckboxesInCart(!isAllChecked));
    setIsAllChecked(!isAllChecked);
  };

  useUpdateEffect(() => {
    if (!cartList?.length) {
      setIsAllChecked(false);
      return;
    }

    if (isAllChecked && cartList.some((product) => !product.isChecked)) {
      setIsAllChecked(false);
      return;
    }

    if (!isAllChecked && cartList.every((product) => product.isChecked)) {
      setIsAllChecked(true);
      return;
    }
  }, [cartList]);

  return [isAllChecked, setIsAllChecked, changeCheckbox, changeAllCheckbox];
};

export default useCartCheckbox;
