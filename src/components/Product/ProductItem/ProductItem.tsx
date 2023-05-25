import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { AddIcon } from '../../../assets';
import { useFetch } from '../../../hooks/useFetch';
import { useModal } from '../../../hooks/useModal';
import { cartItemQuantityState, cartListState } from '../../../store/cart';
import { ProductItemType } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Modal from '../../utils/Modal/Modal';
import ProductAddition from '../ProductAddition/ProductAddition';
import styles from './style.module.css';

interface ProductItemProps {
  information: ProductItemType;
}

const ProductItem = ({ information }: ProductItemProps) => {
  const cartItemQuantity = useRecoilValue(cartItemQuantityState(information.id));
  const [addQuantity, setAddQuantity] = useState(1);

  const { isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress } = useModal();
  const [cartList, setCartList] = useRecoilState(cartListState);
  const { fetchApi } = useFetch<ProductItemType[]>(setCartList);

  const handleCartAdd = () => {
    const compareProductId = information.id;
    fetchApi.post(`cart-items`, { productId: compareProductId, quantity: addQuantity });

    const isExistItem = cartList.find((item) => item.product.id === compareProductId);

    if (isExistItem) {
      setCartList(
        cartList.map((item) => {
          if (item.product.id === compareProductId) {
            return {
              ...item,
              quantity: item.quantity + addQuantity,
            };
          }
          return item;
        })
      );
    } else {
      const newCartList = [
        ...cartList,
        {
          id: Number(new Date()),
          quantity: 1,
          product: information,
          isChecked: true,
        },
      ];
      setCartList(newCartList);
    }

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
            quantity={addQuantity}
            setQuantity={setAddQuantity}
            closeModalByClick={handleModalClose}
            productInformation={information}
            submitEvent={handleCartAdd}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductItem;
