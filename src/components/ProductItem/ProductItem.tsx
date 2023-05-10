import CartIcon from '../../assets/cart-icon.svg';
import { useModal } from '../../hooks/useModal';
import { ProductItemData } from '../../types';
import Modal from '../Modal/Modal';
import ProductAddition from '../ProductAddition/ProductAddition';
import styles from './style.module.css';

interface ProductItemProps {
  information: ProductItemData;
}

const ProductItem = ({ information }: ProductItemProps) => {
  const [isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress] = useModal();

  return (
    <div className={styles.container}>
      <img src={information.imageUrl} alt={information.name} className={styles.image} />
      <div className={styles.informationContainer}>
        <div>
          <h4 className={styles.name}>{information.name}</h4>
          <h4 className={styles.price}>{information.price}원</h4>
        </div>
        <button type="button" onClick={handleModalOpen}>
          <img src={CartIcon} alt="cart icon" />
        </button>
      </div>
      {isModalOpen && (
        <Modal closeModalByClick={handleModalClose} closeModalByPress={handleModalClosePress}>
          <ProductAddition closeModalByClick={handleModalClose} productInformation={information} />
        </Modal>
      )}
    </div>
  );
};

export default ProductItem;
