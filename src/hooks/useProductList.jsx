import { useDispatch, useSelector } from 'react-redux';
import { insertShoppingCartItem } from '../redux/shoppingCart';

const useProductList = () => {
  const dispatch = useDispatch();
  const shoppingCartItemList = useSelector((state) => state.shoppingCart.shoppingCartList);

  const insertProductItem = (product) => {
    const isDuplicatedItem = shoppingCartItemList.some(({ product_id }) => product_id === product.product_id);

    if (!isDuplicatedItem) {
      dispatch(insertShoppingCartItem({ ...product, isChecked: true, quantity: 1 }));
    }
    alert('장바구니에 추가되었습니다');
  };

  return {
    insertProductItem,
  };
};

export default useProductList;
