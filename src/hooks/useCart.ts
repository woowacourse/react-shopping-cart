import {useRecoilState, useRecoilValue} from 'recoil';
import {allCartCheckedSelector, cartState} from '../recoil/cartAtoms';
import {initCartListCheckbox} from '../domain/cart';

function useCart() {
  const [cartList, setCartList] = useRecoilState(cartState);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);

  const switchAllCheckboxes = () => {
    const changedCartList = initCartListCheckbox(cartList, !isAllCartItemChecked);
    setCartList(changedCartList);
  };

  return {
    switchAllCheckboxes
  };
}

export default useCart;
