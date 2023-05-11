import { useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { cartAdditionState, cartListState } from '../../store/cart';
import { ProductItemData } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

interface ProductAdditionProps {
  productInformation: ProductItemData;
  handleModalClose: () => void;
}

const ProductAddition = ({ productInformation, handleModalClose }: ProductAdditionProps) => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const setCartAddition = useSetRecoilState(cartAdditionState);
  const [quantity, setQuantity] = useState(1);

  const handleCartAdd = useCallback(() => {
    const compareProductId = productInformation.id;
    const selectedCartItemIndex = cartList.findIndex(
      (cartItem) => cartItem.product.id === compareProductId
    );

    if (selectedCartItemIndex === -1) {
      const newCartId = Number(new Date());
      const newCartItem = {
        id: newCartId,
        quantity,
        product: productInformation,
      };
      setCartList([...cartList, newCartItem]);
    } else {
      const updatedCartList = [...cartList];
      updatedCartList[selectedCartItemIndex] = {
        ...updatedCartList[selectedCartItemIndex],
        quantity: updatedCartList[selectedCartItemIndex].quantity + quantity,
      };
      setCartList(updatedCartList);
      setCartAddition(true);
    }

    handleModalClose();
  }, [cartList, handleModalClose, productInformation, quantity, setCartList, setCartAddition]);

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
        <button className={styles.cancelButton} aria-label="close modal" onClick={handleModalClose}>
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
