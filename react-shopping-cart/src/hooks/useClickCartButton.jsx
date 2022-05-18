import { useDispatch } from 'react-redux';

import {
  addProductToCartStart,
  deleteProductFromCartStart,
} from 'redux/carts/carts.action';

import { CURRENT_USER } from 'constants/index';

function useClickCartButton() {
  const dispatch = useDispatch();

  const handleDeleteProductFromCart = (e, id) => {
    e.stopPropagation();
    dispatch(deleteProductFromCartStart(id));
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

export default useClickCartButton;
