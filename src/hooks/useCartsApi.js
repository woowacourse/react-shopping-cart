import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCarts, deleteProductFromCarts } from 'store/carts';
import useDebounce from './useDebounce';
import useDeleteProductFromCart from './useDeleteProductFromCart';
import useStoreProduct from './useStoreProduct';

function useCartsApi({ id, isStored, Loading, Error, Clicked, Unclicked }) {
  const dispatch = useDispatch();
  const debounce = useDebounce();

  const [isClicked, setIsClicked] = useState(isStored);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isCartAddLoading, addToCart, cartAddError } = useStoreProduct(id);
  const { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError } =
    useDeleteProductFromCart(id);

  const onClickButton = () => {
    if (!isLoggedIn) {
      alert('로그인 해주세요.');
      return;
    }

    debounce(() => {
      if (isClicked !== isStored) {
        return;
      }

      if (isStored) {
        deleteFromCart();
        dispatch(deleteProductFromCarts(id));
      } else {
        addToCart();
        dispatch(addProductToCarts(id));
      }
    }, 500);

    setIsClicked((prev) => !prev);
  };

  const isError = deleteProductFromCartError || cartAddError;
  const isLoading = (isCartAddLoading || isCartDeleteLoading) && !isError;

  const Success = isClicked ? Clicked : Unclicked;

  return {
    Inner: (
      <>
        {Loading ? (isLoading ? Loading : Success) : Success}
        {isError && Error}
      </>
    ),
    onClickButton,
  };
}

export default useCartsApi;
