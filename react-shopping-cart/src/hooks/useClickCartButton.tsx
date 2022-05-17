import { useDispatch } from "react-redux";

import { CURRENT_USER } from "constants/index";
import {
  addProductToCartStart,
  deleteProductToCartStart,
} from "redux/carts/carts.action";
import { Product } from "type";

function useClickCartButton() {
  const dispatch = useDispatch();

  const handleDeleteProduct = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(deleteProductToCartStart(id));
  };

  const handleAddProduct = (
    e: React.MouseEvent,
    { name, price, id, thumbnail }: Product
  ) => {
    e.stopPropagation();
    dispatch(
      addProductToCartStart({
        name,
        price,
        id: `${CURRENT_USER}${id}`,
        thumbnail,
        quantity: 1,
        user: CURRENT_USER,
      })
    );
  };

  return { handleAddProduct, handleDeleteProduct };
}

export default useClickCartButton;
