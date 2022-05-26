import { useDispatch } from 'react-redux';
import { addCartItem } from 'reduxModule/cart';

export const useAddCartEvent = () => {
  const dispatch = useDispatch();
  const onAddClick = (id) => {
    if (window.confirm('상품을 장바구니에 담으시겠습니까?')) {
      dispatch(addCartItem(id));
    }
  };
  return [onAddClick];
};
