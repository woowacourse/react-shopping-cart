import { useDispatch } from 'react-redux';
import {
  addShoppingCartItemAsync,
  increaseProductAmount,
} from '../redux/action';
import { CartProductDetailType, ProductDetailType } from '../type';
import useModal from './useModal';

const useSuccessAddedModal = (
  shoppingCartProducts: {
    [key: string]: CartProductDetailType;
  },
  products: {
    [key: string]: ProductDetailType;
  }
) => {
  const {
    isModalOpen,
    open: openModal,
    onClickClose: onClickModalClose,
  } = useModal(false);
  const dispatch = useDispatch();

  const onClickTrigger = (productId: string) => {
    if (shoppingCartProducts[productId]) {
      dispatch(increaseProductAmount(products[productId]));
    } else {
      dispatch(addShoppingCartItemAsync(products[productId]));
    }

    openModal();
  };

  return {
    isModalOpen,
    onClickModalClose,
    onClickTrigger,
    openModal,
  };
};

export default useSuccessAddedModal;
