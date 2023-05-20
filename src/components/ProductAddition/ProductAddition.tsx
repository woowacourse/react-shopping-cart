import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

import { useFetch } from '../../hooks/useFetch';
import { cartListState } from '../../store/cart';
import { ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

interface ProductAdditionProps {
  productInformation: ProductItemType;
  closeModalByClick: () => void;
}

const ProductAddition = ({ productInformation, closeModalByClick }: ProductAdditionProps) => {
  const [quantity, setQuantity] = useState(1);

  const [, setCartList] = useRecoilState(cartListState);
  const { fetchApi } = useFetch<ProductItemType[]>(setCartList);

  const handleCartAdd = useCallback(() => {
    const compareProductId = productInformation.id;
    fetchApi.post('/add-cart-list', { itemId: compareProductId, quantity });

    closeModalByClick();
  }, [closeModalByClick, fetchApi, productInformation.id, quantity]);

  return (
    <div className={styles.container}>
      <h4 className={styles.header}>장바구니 담기</h4>
      <div className={styles.informationContainer}>
        <img src={productInformation.imageUrl} alt={productInformation.name} />
        <div>
          <div>
            <h4 className={styles.productName}>{productInformation.name}</h4>
            <h4 className={styles.productPrice}>{priceFormatter(productInformation.price)}원</h4>
          </div>
          <StepperButton count={quantity} setCount={setQuantity} />
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
        <button className={styles.addButton} aria-label="add item" onClick={handleCartAdd}>
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default ProductAddition;
