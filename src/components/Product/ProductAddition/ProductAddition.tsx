import { ProductItemType } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import StepperButton from '../../utils/StepperButton/StepperButton';
import styles from './style.module.css';

interface ProductAdditionProps {
  productInformation: ProductItemType;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  closeModalByClick: () => void;
  submitEvent: (quantity: number) => void;
}

const ProductAddition = ({
  productInformation,
  quantity,
  setQuantity,
  closeModalByClick,
  submitEvent,
}: ProductAdditionProps) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.header}>장바구니 담기</h4>
      <div className={styles.informationContainer}>
        <img src={productInformation.imageUrl} alt={productInformation.name} />
        <div className={styles.informationContainertwo}>
          <div>
            <h4 className={styles.productName}>{productInformation.name}</h4>
            <h4 className={styles.productPrice}>{priceFormatter(productInformation.price)}원</h4>
          </div>
          <StepperButton itemId={productInformation.id} count={quantity} setCount={setQuantity} />
        </div>
      </div>
      <div className={styles.totalPriceContainer}>
        <h5>합계</h5>
        <h3>{priceFormatter(productInformation.price * quantity)} 원</h3>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          aria-label="close modal"
          onClick={closeModalByClick}
        >
          취소
        </button>
        <button
          className={styles.addButton}
          aria-label="add item"
          onClick={() => {
            submitEvent(quantity);
          }}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default ProductAddition;
