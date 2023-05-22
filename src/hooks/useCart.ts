import {useRecoilState, useRecoilValue} from 'recoil';
import {allCartCheckedSelector, cartState, checkedCartSelector} from '../recoil/cartAtoms';
import {fetchDeleteCart} from '../api/api';
import {initCartListCheckbox, updateCartCheckbox} from '../domain/cart';

function useCart() {
  const [cartList, setCartList] = useRecoilState(cartState);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);
  const checkedCartList = useRecoilValue(checkedCartSelector);

  const removeCheckedCartList = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const targetIds = checkedCartList.map(cartList => cartList.id);
      const removedCartList = cartList.filter((cart) => !targetIds.includes(cart.id));
      setCartList(removedCartList);
      targetIds.forEach((id) => {
        fetchDeleteCart(id);
      });
    }
  };

  const switchCheckbox = (id: number) => {
    const changedCartList = updateCartCheckbox([...cartList], id);
    setCartList(changedCartList);
  };

  const switchAllCheckboxes = () => {
    const changedCartList = initCartListCheckbox(cartList, !isAllCartItemChecked);
    setCartList(changedCartList);
  };

  return {
    removeCheckedCartList,
    switchCheckbox,
    switchAllCheckboxes
  };
}

export default useCart;
