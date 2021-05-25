import { useDispatch } from 'react-redux';
import {
  addShoppingCartItemAsync,
  increaseProductAmount,
} from '../redux/action';
import { CartProductDetailObjectType, ProductDetailObjectType } from '../type';
import useModal from './useModal';

const useSuccessAddedModal = (
  shoppingCartProducts: CartProductDetailObjectType,
  products: ProductDetailObjectType
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
