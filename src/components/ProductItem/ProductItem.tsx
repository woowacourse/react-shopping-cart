import { useRecoilValue } from 'recoil';

import { AddIcon } from '../../assets';
import { useModal } from '../../hooks/useModal';
import { cartItemQuantityState } from '../../store/cart';
import { ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import Modal from '../Modal/Modal';
import ProductAddition from '../ProductAddition/ProductAddition';
import styles from './style.module.css';

interface ProductItemProps {
  information: ProductItemType;
}

const ProductItem = ({ information }: ProductItemProps) => {
  const cartItemQuantity = useRecoilValue(cartItemQuantityState(information.id));

  const { isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress } = useModal();

  return (
    <div className={styles.container}>
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
          <ProductAddition closeModalByClick={handleModalClose} productInformation={information} />
        </Modal>
      )}
    </div>
  );
};

export default ProductItem;
