import { useState } from 'react';

import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

interface ProductAdditionProps {
  productName: string;
  productImage: string;
  price: number;
  closeModalByClick: () => void;
}

const ProductAddition = ({
  productName,
  productImage,
  price,
  closeModalByClick,
}: ProductAdditionProps) => {
  const [count, setCount] = useState(1);

  return (
    <div className={styles.container}>
      <h4 className={styles.header}>장바구니 담기</h4>
      <div className={styles.informationContainer}>
        <img src={productImage} alt={productName} />
        <div>
          <h4 className={styles.productName}>{productName}</h4>
          <h4 className={styles.productPrice}>{price}원</h4>
          <StepperButton count={count} setCount={setCount} />
        </div>
      </div>
      <div className={styles.totalPriceContainer}>
        <h5>합계</h5>
        <h3>{price * count} 원</h3>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={closeModalByClick}>
          취소
        </button>
        <button className={styles.addButton}>장바구니 담기</button>
      </div>
    </div>
  );
};

export default ProductAddition;
