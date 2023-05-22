import {useRecoilState, useRecoilValue} from 'recoil';
import {allCartCheckedSelector, cartState} from '../recoil/cartAtoms';
import {initCartListCheckbox, updateCartCheckbox} from '../domain/cart';

function useCart() {
  const [cartList, setCartList] = useRecoilState(cartState);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);

  const switchCheckbox = (id: number) => {
    const changedCartList = updateCartCheckbox([...cartList], id);
    setCartList(changedCartList);
  };

  const switchAllCheckboxes = () => {
    const changedCartList = initCartListCheckbox(cartList, !isAllCartItemChecked);
    setCartList(changedCartList);
  };

  return {
    switchCheckbox,
    switchAllCheckboxes
  };
}

export default useCart;
