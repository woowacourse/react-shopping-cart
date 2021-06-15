import { useSelector } from 'react-redux';
import { getTotalPrice } from '../utils/getTotalPrice';

const useShoppingCart = () => {
  const shoppingCartItemList = useSelector((state) => state.shoppingCart.shoppingCartList);

  const checkedShoppingCartItemList = shoppingCartItemList.filter((item) => item.isChecked);
  const checkedCount = checkedShoppingCartItemList.length;

  const isAllShoppingCartItemChecked = useSelector((state) => state.shoppingCart.isAllShoppingCartItemChecked);

  const shoppingCartTotalPrice = getTotalPrice(checkedShoppingCartItemList);

  return {
    shoppingCartItemList,
    checkedShoppingCartItemList,
    checkedCount,
    isAllShoppingCartItemChecked,
    shoppingCartTotalPrice,
  };
};

export default useShoppingCart;
