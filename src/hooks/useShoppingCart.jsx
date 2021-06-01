import { API_PATH } from '../constants/api';
import { requestDeleteItem, requestGetItemList, requestInsertItem } from '../request/request';
import useSWR from 'swr';
import { MESSAGE } from '../constants/message';
import useSnackbar from './useSnackbar';
import { SNACKBAR_TYPE } from '../components';

const getShoppingCartItemList = async () => {
  const shoppingCartItemList = await requestGetItemList(API_PATH.SHOPPING_CART_LIST);

  return shoppingCartItemList.map((item) => ({ ...item, quantity: 1, isChecked: true }));
};

const useShoppingCart = () => {
  const {
    data: shoppingCartItemList,
    isLoading,
    mutate,
  } = useSWR(API_PATH.SHOPPING_CART_LIST, getShoppingCartItemList, {
    suspense: true,
    revalidateOnFocus: false,
  });

  const { addSnackbar } = useSnackbar();

  const isAllShoppingCartItemChecked =
    shoppingCartItemList.length === shoppingCartItemList.filter((item) => item.isChecked).length;

  const insertShoppingCartItem = async (productId) => {
    const isExistedInShoppingCart = shoppingCartItemList.some(
      (shoppingCartItem) => shoppingCartItem.productId === productId
    );

    if (isExistedInShoppingCart) {
      addSnackbar({ message: MESSAGE.FAILURE.ADD_SHOPPING_CART_ITEM, type: SNACKBAR_TYPE.FAILURE });

      return;
    }

    addSnackbar({ message: MESSAGE.SUCCESS.ADD_SHOPPING_CART_ITEM, type: SNACKBAR_TYPE.SUCCESS });

    try {
      await requestInsertItem(API_PATH.SHOPPING_CART_LIST, { productId });
      mutate();
    } catch (error) {
      console.error(error);
      addSnackbar({ message: error.message });
    }
  };

  const deleteShoppingCartItem = async (id) => {
    try {
      await requestDeleteItem(API_PATH.SHOPPING_CART_LIST, id);
      mutate();
    } catch (error) {
      console.error(error);
      addSnackbar({ message: error.message });
    }
  };

  const deleteCheckedShoppingCartItem = async (checkedItemList) => {
    try {
      await Promise.all(checkedItemList.map(({ cartId }) => requestDeleteItem(API_PATH.SHOPPING_CART_LIST, cartId)));
      mutate();
    } catch (error) {
      console.error(error);
      addSnackbar({ message: error.message });
    }
  };

  const toggleShoppingCartItem = (id) => {
    const changedShoppingCartItemList = shoppingCartItemList.map((shoppingCartItem) => {
      if (shoppingCartItem.cartId === id) {
        return {
          ...shoppingCartItem,
          isChecked: !shoppingCartItem.isChecked,
        };
      }

      return shoppingCartItem;
    });

    mutate(changedShoppingCartItemList, false);
  };

  const toggleAllShoppingCartItem = () => {
    const changedShoppingCartItemList = shoppingCartItemList.map((shoppingCartItem) => ({
      ...shoppingCartItem,
      isChecked: !isAllShoppingCartItemChecked,
    }));

    mutate(changedShoppingCartItemList, false);
  };

  const increaseQuantity = (id) => {
    const changedShoppingCartItemList = shoppingCartItemList.map((shoppingCartItem) => {
      if (shoppingCartItem.cartId === id) {
        return {
          ...shoppingCartItem,
          quantity: shoppingCartItem.quantity + 1,
        };
      }
      return shoppingCartItem;
    });

    mutate(changedShoppingCartItemList, false);
  };

  const decreaseQuantity = (id) => {
    const changedShoppingCartItemList = shoppingCartItemList.map((shoppingCartItem) => {
      if (shoppingCartItem.cartId === id) {
        return {
          ...shoppingCartItem,
          quantity: shoppingCartItem.quantity - 1,
        };
      }
      return shoppingCartItem;
    });

    mutate(changedShoppingCartItemList, false);
  };

  return {
    shoppingCartItemList,
    isAllShoppingCartItemChecked,
    insertShoppingCartItem,
    deleteShoppingCartItem,
    deleteCheckedShoppingCartItem,
    toggleShoppingCartItem,
    toggleAllShoppingCartItem,
    increaseQuantity,
    decreaseQuantity,
    isLoading,
  };
};

export default useShoppingCart;
