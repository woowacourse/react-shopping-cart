import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartListAtom,
  countCartListSelector,
  countSelectedCartItemsSelector,
  deleteCartItemSelector,
  wholeCartITemToggleSelector,
} from 'src/recoil/cartList';
import { useDeleteFetch } from './useFetch';
import useToast from './useToast';

const useCartListUpdate = () => {
  const { toast } = useToast();
  const cartList = useRecoilValue(cartListAtom);
  const wholeCartItemsCount = useRecoilValue(countCartListSelector);
  const selectedCartItems = useRecoilValue(countSelectedCartItemsSelector);

  const setDeleteCartList = useSetRecoilState(deleteCartItemSelector);

  const { deleteData, error } = useDeleteFetch();

  const [wholeSelected, setWholeSelected] = useRecoilState(
    wholeCartITemToggleSelector
  );

  useEffect(() => {
    setWholeSelected(true);
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget;
    setWholeSelected(checked);
  };

  const onClickDeleteHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const selectedIds = selectedCartItems.map((item) => item.id);

    for (const id of selectedIds) {
      deleteData(`/api/cart-items/${id}`);
      if (error.isError) {
        toast.error(error.message);
        return;
      }
    }

    setDeleteCartList([...selectedIds]);
  };

  return {
    cartList,
    onChange,
    onClickDeleteHandler,
    wholeSelected,
    wholeCartItemsCount,
    selectedLength: selectedCartItems.length,
  };
};

export default useCartListUpdate;
