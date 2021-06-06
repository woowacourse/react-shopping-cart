import { useSnackbar } from 'notistack';
import { useAppDispatch } from './useStore';
import * as T from '../types';
import cartItemsSlice, { deleteCheckedItems, deleteItem } from '../slices/cartSlice';
import MESSAGE from '../constants/messages';
import useCart from './useCart';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCartPage = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { data: cartItems, status, onAdd } = useCart();
  const { checkCartItem, checkAllCartItems } = cartItemsSlice.actions;

  const isInitialLoading = status === T.AsyncStatus.PENDING && cartItems.length === 0;

  const isAllChecked = cartItems?.every?.((item) => item.checked);
  const checkedItems = cartItems?.filter?.((item) => item.checked);

  const checkedItemsTotalPrice = cartItems?.reduce((acc: number, curr: T.CartItem) => {
    if (!curr.checked) return acc;

    return acc + curr.price * curr.quantity;
  }, 0);

  const onDeleteItem = async (id: T.CartItem['cartId']) => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CART_ITEM)) return;

    const resultAction = await dispatch(deleteItem(id));
    if (deleteItem.rejected.match(resultAction)) {
      enqueueSnackbar(MESSAGE.DELETE_CART_ITEM_FAILURE);
      return;
    }

    enqueueSnackbar(MESSAGE.DELETE_CART_ITEM_SUCCESS);
  };

  const onDeleteCheckedItem = async () => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CHECKED_CART_ITEMS)) return;

    const ids = checkedItems?.map((item) => item.cartId);

    const resultAction = await dispatch(deleteCheckedItems(ids));
    if (deleteCheckedItems.rejected.match(resultAction)) {
      enqueueSnackbar(MESSAGE.DELETE_CART_ITEM_FAILURE);
      return;
    }

    enqueueSnackbar(MESSAGE.DELETE_CHECKED_CART_ITEMS_SUCCESS);
  };

  const onCheck = (cartId: number, checked: boolean) => {
    dispatch(checkCartItem({ cartId, checked }));
  };

  const onCheckAll = () => {
    dispatch(checkAllCartItems({ checked: !isAllChecked }));
  };

  return {
    cartItems,
    checkedItems,
    isInitialLoading,
    isAllChecked,
    checkedItemsTotalPrice,
    onAdd,
    onDeleteItem,
    onDeleteCheckedItem,
    onCheck,
    onCheckAll,
  };
};

export default useCartPage;
