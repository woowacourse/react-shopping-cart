import { createPortal } from 'react-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { AddIcon } from '../../assets';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import { cartItemQuantityState, cartListState } from '../../store/cart';
import { ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import Modal from '../Modal/Modal';
import PopUp from '../PopUp/PopUp';
import ProductAddition from '../ProductAddition/ProductAddition';
import styles from './style.module.css';

interface ProductItemProps {
  information: ProductItemType;
}

const ProductItem = ({ information }: ProductItemProps) => {
  const cartItemQuantity = useRecoilValue(cartItemQuantityState(information.id));

  const { isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress } = useModal();
  const [, setCartList] = useRecoilState(cartListState);
  const { fetchApi, isSuccess, isFailure } = useFetch<ProductItemType[]>(setCartList);

  const handleCartAdd = (quantity: number) => {
    const compareProductId = information.id;
    fetchApi.post('/add-cart-list', { itemId: compareProductId, quantity });

    handleModalClose();
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <img src={information.imageUrl} alt={information.name} className={styles.image} />
        <button
          type="button"
          className={`${styles.itemButton} ${
            cartItemQuantity ? styles.quantityButton : styles.addButton
          }`}
          onClick={handleModalOpen}
        >
          {cartItemQuantity?.quantity ? (
            cartItemQuantity.quantity
          ) : (
            <AddIcon width={16} height={16} />
          )}
        </button>
      </div>
      <h4 className={styles.name}>{information.name}</h4>
      <h4 className={styles.price}>{priceFormatter(information.price)}원</h4>
      {isModalOpen && (
        <Modal closeModalByClick={handleModalClose} closeModalByPress={handleModalClosePress}>
          <ProductAddition
            closeModalByClick={handleModalClose}
            productInformation={information}
            submitEvent={handleCartAdd}
          />
        </Modal>
      )}
      {isSuccess &&
        createPortal(<PopUp text={['아이템이 추가되었습니다.']} isSuccess={true} />, document.body)}
      {isFailure &&
        createPortal(
          <PopUp text={['오류가 발생했습니다.😭', '다시 시도해주세요.']} isSuccess={false} />,
          document.body
        )}
    </div>
  );
};

export default ProductItem;
