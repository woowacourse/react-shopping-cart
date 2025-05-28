import * as styles from './CartItemList.style';
import CheckBox from '../CheckBox';
import CartItem from '../CartItem/CartItem';
import { CartItemType } from '../../types/cartItem';
import Button from '../Button';
import { useCheckList } from '../../hooks/useCheckList';

interface CartItemListProps {
  cartItems: CartItemType[];
}

export default function CartItemList({ cartItems }: CartItemListProps) {
  const itemIds = cartItems.map((item) => item.id);
  const { state, isAllChecked, toggle, checkAll, uncheckAll } = useCheckList(itemIds);

  const orderAmount = cartItems
    .filter((item) => state[item.id])
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = orderAmount > 100000 ? 0 : 3000;
  const totalAmount = orderAmount + deliveryFee;

  return (
    <div css={styles.cartItemsAreaCss}>
      {cartItems.length === 0 ? (
        <p>장바구니에 담은 상품이 없습니다.</p>
      ) : (
        <>
          <div css={styles.allSelectCss}>
            <CheckBox checked={isAllChecked} onChange={isAllChecked ? uncheckAll : checkAll} />
            <p>전체 선택</p>
          </div>
          <div css={styles.cartItemsListCss}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                checked={state[item.id]}
                handleCheckBoxChange={() => toggle(item.id)}
              />
            ))}
          </div>
          <section>
            <div css={styles.infoDeliveryFeeCss}>
              <img src="./assets/info.svg" alt="info icon" />
              <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
            </div>
            <hr css={styles.hrSss} />
            <div css={styles.priceRowCss}>
              <p css={styles.priceTitleCss}>주문 금액</p>
              <p css={styles.priceCss}>{orderAmount.toLocaleString()}원</p>
            </div>
            <div css={styles.priceRowCss}>
              <p css={styles.priceTitleCss}>배송비</p>
              <p css={styles.priceCss}>{deliveryFee.toLocaleString()}원</p>
            </div>
            <hr css={styles.hrSss} />
            <div css={styles.priceRowCss}>
              <p css={styles.priceTitleCss}>총 결제 금액</p>
              <p css={styles.priceCss}>{totalAmount.toLocaleString()}원</p>
            </div>
          </section>
        </>
      )}
      <Button disabled={!Object.values(state).some(Boolean)}>주문 확인</Button>
    </div>
  );
}
