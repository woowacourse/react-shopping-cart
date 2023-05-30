import { useRecoilState, useRecoilValue } from 'recoil';

import useCartList from '../../../hooks/useCartList';
import { cartListState } from '../../../store/cart';
import { currentCartList } from '../../../store/selectors';
import { priceFormatter } from '../../../utils/formatter';
import Checkbox from '../../utils/Checkbox/Checkbox';
import CartItem from '../CartItem/CartItem';
import styles from './style.module.css';

const CartPageSection = () => {
  const [cartItem, setCartItemList] = useRecoilState(cartListState);
  const currentCartListData = useRecoilValue(currentCartList);

  const {
    removeCheckedItems,
    removeSelectedItem,
    getCheckedList,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
    reverseCheckCartItem,
    getCartItemSum,
  } = useCartList();

  setCartItemList(currentCartListData);

  const handleCheckedItemRemove = () => {
    removeCheckedItems();
  };

  const handleSelectedItemRemove = (itemId: number) => {
    removeSelectedItem(itemId);
  };

  const checkedItemLength = getCheckedList().length;

  const deliveryPrice = currentCartListData.length === 0 ? 0 : 3000;

  return (
    <>
      <div className={styles.cartLstHeader}>장바구니</div>
      <hr />
      <div className={styles.cartListSection}>
        <div className={styles.deleteBox}>
          <Checkbox
            checked={checkedItemLength === currentCartListData.length}
            clickEvent={
              checkedItemLength === currentCartListData.length
                ? resetCartCheckStatusToFalse
                : resetCartCheckStatusToTrue
            }
          />
          <p>
            전체 선택({getCheckedList().length}/{currentCartListData?.length})
          </p>
          <button type="button" className={styles.deleteButton} onClick={handleCheckedItemRemove}>
            선택 삭제
          </button>
        </div>
        <section className={styles.section}>
          <div className={styles.cartList}>
            {cartItem.map((item) => (
              <CartItem
                quantity={item.quantity}
                itemId={item.id}
                key={item.id}
                product={item.product}
                isChecked={item.isChecked}
                checkHandler={reverseCheckCartItem}
                removeItem={handleSelectedItemRemove}
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
                <button
                  className={
                    checkedItemLength > 0 ? styles.orderButton : styles.orderButtonDisabled
                  }
                  type="button"
                  disabled={checkedItemLength === 0}
                >
                  {checkedItemLength > 0
                    ? `총 ${checkedItemLength}개 상품 주문하기`
                    : '상품을 선택해주세요'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CartPageSection;
