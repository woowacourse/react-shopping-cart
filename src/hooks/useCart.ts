import {useRecoilState, useRecoilValue} from 'recoil';
import type {NewCartItem, ProductItem} from '../types/types';
import {allCartCheckedSelector, cartState, checkedCartSelector} from '../recoil/cartAtoms';
import {fetchAddCart, fetchDeleteCart, fetchUpdateCart} from '../api/api';
import {initCartListCheckbox, updateCartCheckbox} from '../domain/cart';

function useCart() {
  const [cartList, setCartList] = useRecoilState(cartState);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);
  const checkedCartList = useRecoilValue(checkedCartSelector);

  const addCart = (product: ProductItem) => {
    const isCartItemExist = cartList.some((cartItem) => cartItem.id === product.id);

    if (!isCartItemExist) {
      const newCartItem: NewCartItem = {
        id: product.id,
        quantity: 1,
        checked: true,
        product
      };
      const updatedCartList = [...cartList, newCartItem];
      setCartList(updatedCartList);
      fetchAddCart(newCartItem.id);
    }
  };

  const removeCart = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const removedCartList = cartList.filter((cart) => cart.id !== id);
      setCartList(removedCartList);
      fetchDeleteCart(id);
    }
  };

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
    addCart,
    removeCart,
    removeCheckedCartList,
    switchCheckbox,
    switchAllCheckboxes
  };
}

export default useCart;
