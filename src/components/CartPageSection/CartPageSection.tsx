import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';

import { useCartList } from '../../hooks/useCartList';
import { useFetch } from '../../hooks/useFetch';
import { cartListState } from '../../store/cart';
import { CartItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import CartItem from '../CartItem/CartItem';
import Checkbox from '../Checkbox/Checkbox';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import PopUp from '../PopUp/PopUp';
import styles from './style.module.css';

const CartPageSection = () => {
  const [cartItem, setCartItemList] = useRecoilState(cartListState);
  const {
    cartList,
    getCartItemSum,
    reverseCheckCartItem,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
    cartListCheckedLength,
  } = useCartList();

  const { fetchApi, isLoading, isSuccess, isFailure } = useFetch<CartItemType[]>(setCartItemList);
  useEffect(() => {
    fetchApi.get('/cartlist');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkedItemRemove = () => {
    fetchApi.patch('/checked-cart-item-remove');
  };

  const selectedItemRemove = (itemId: number) => {
    fetchApi.delete(`/cart-item-remove?id=${itemId}`);
  };

  const cartListLength = cartListCheckedLength();
  const deliveryPrice = cartListLength === 0 ? 0 : 3000;

  return (
    <>
      <div className={styles.cartLstHeader}>장바구니</div>
      <hr />
      <div className={styles.cartListSection}>
        <div className={styles.deleteBox}>
          <Checkbox
            checked={cartListLength === cartList.length}
            clickEvent={
              cartListLength === cartList.length
                ? resetCartCheckStatusToFalse
                : resetCartCheckStatusToTrue
            }
          />
          <p>
            전체 선택({cartListLength}/{cartItem?.length})
          </p>
          <button type="button" className={styles.deleteButton} onClick={checkedItemRemove}>
            선택 삭제
          </button>
        </div>
        <section className={styles.section}>
          <div className={styles.cartList}>
            {!isLoading ? (
              cartItem.map((item) => (
                <CartItem
                  quantity={item.quantity}
                  itemId={item.id}
                  key={item.id}
                  product={item.product}
                  isChecked={item.isChecked}
                  checkHandler={reverseCheckCartItem}
                  removeItem={selectedItemRemove}
                />
              ))
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div className={styles.orderBox}>
            <div className={styles.orderBoxHeader}>결제예상금액</div>

            <div className={styles.orderPrice}>
              <div>
                <div className={styles.resultText}>
                  <div>총 상품가격</div>
                  <div>{priceFormatter(getCartItemSum())}원</div>
                </div>
                <div className={styles.resultText}>
                  <div>총 배송비</div>
                  <div>{priceFormatter(deliveryPrice)}원</div>
                </div>
              </div>
              <div>
                <div className={styles.resultPrice}>
                  <div>총 주문금액</div>
                  <div>{priceFormatter(getCartItemSum() + deliveryPrice)}원</div>
                </div>
                <button
                  className={cartListLength > 0 ? styles.orderButton : styles.orderButtonDisabled}
                  type="button"
                  disabled={cartListLength === 0}
                >
                  {cartListLength > 0
                    ? `총 ${cartListLength}개 상품 주문하기`
                    : '상품을 선택해주세요'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {isSuccess &&
        createPortal(<PopUp text={['아이템이 삭제되었습니다.']} isSuccess={true} />, document.body)}
      {isFailure &&
        createPortal(
          <PopUp text={['오류가 발생했습니다.😭', '다시 시도해주세요.']} isSuccess={false} />,
          document.body
        )}
    </>
  );
};

export default CartPageSection;
