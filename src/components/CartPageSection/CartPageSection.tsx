import { useRecoilValue } from 'recoil';

import { useCartList } from '../../hooks/useCartList';
import { cartListState } from '../../store/cart';
import { priceFormatter } from '../../utils/formatter';
import CartItem from '../CartItem/CartItem';
import styles from './style.module.css';

const CartPageSection = () => {
  const cartItemList = useRecoilValue(cartListState);
  const {
    cartList,
    getCartItemSum,
    reverseCheckCartItem,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
    cartListCheckedLength,
  } = useCartList();

  const deliveryPrice = 3000;

  return (
    <>
      <div className={styles.cartLstHeader}>장바구니</div>
      <hr />

      <div className={styles.deleteBox}>
        <input
          type="checkbox"
          className={styles.deleteChecker}
          onClick={
            cartListCheckedLength() === cartList.length
              ? resetCartCheckStatusToFalse
              : resetCartCheckStatusToTrue
          }
          checked={cartListCheckedLength() === cartList.length}
        />
        <p>
          전체 선택({cartListCheckedLength()}/{cartItemList.length})
        </p>
        <button type="button" className={styles.deleteButton}>
          선택 삭제
        </button>
      </div>
      <section className={styles.section}>
        <div className={styles.cartList}>
          {cartItemList.map((item) => (
            <CartItem
              quantity={item.quantity}
              itemId={item.id}
              key={item.id}
              product={item.product}
              isChecked={item.isChecked}
              checkHandler={reverseCheckCartItem}
            />
          ))}
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
              <button className={styles.orderButton} type="button">
                주문하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPageSection;
