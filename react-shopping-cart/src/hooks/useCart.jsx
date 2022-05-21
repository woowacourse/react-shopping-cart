import { useDispatch } from 'react-redux';

import {
  addProductToCartStart,
  deleteProductFromCartStart,
  fetchCartsStart,
} from 'redux/carts/carts.action';

import { CURRENT_USER } from 'constants/index';

function useCart() {
  const dispatch = useDispatch();

  const handleDeleteProductFromCart = (e, id) => {
    e.stopPropagation();

    if (window.confirm('장바구니에서 삭제하시겠습니까?')) {
      dispatch(deleteProductFromCartStart(id));
    }
  };

  const handleAddProductToCart = (e, { name, price, id, thumbnail }) => {
    e.stopPropagation();

    dispatch(
      addProductToCartStart({
        name,
        price,
        id: `${CURRENT_USER}${id}`,
        thumbnail,
        user: CURRENT_USER,
      })
    );
  };

  return { handleAddProductToCart, handleDeleteProductFromCart };
}

export default useCart;
