import * as styles from './CartItemList.style';
import CheckBox from '../common/CheckBox';
import CartItem from '../CartItem/CartItem';
import { CartItemType } from '../../types/cartItem';
import Button from '../common/Button';
import { useCheckList } from '../../hooks/useCheckList';
import { useNavigate } from 'react-router';
import PriceArea from '../PriceArea/PriceArea';
import { useCartSummary } from './useCartSummary';

interface CartItemListProps {
  cartItems: CartItemType[];
}

export default function CartItemList({ cartItems }: CartItemListProps) {
  const navigate = useNavigate();
  const { state, isAllChecked, toggle, checkAll, uncheckAll } = useCheckList(cartItems, (item) => item.id);

  const checkedItems = cartItems.filter((item) => state.get(item.id));
  const { orderAmount, deliveryFee, totalQuantity, totalAmount, countOfItemType } = useCartSummary(checkedItems);

  return (
    <div css={styles.cartItemsAreaCss}>
      <>
        <div css={styles.allSelectCss}>
          <CheckBox checked={isAllChecked} onChange={isAllChecked ? uncheckAll : checkAll} />
          <p>전체 선택</p>
        </div>
        <div css={styles.cartItemsListCss} data-testid="cart-item-list">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              checked={state.get(item.id) ?? false}
              handleCheckBoxChange={() => toggle(item.id)}
            />
          ))}
        </div>
        <PriceArea orderAmount={orderAmount} deliveryFee={deliveryFee} totalAmount={totalAmount} />
      </>
      <Button
        disabled={!Array.from(state.values()).some(Boolean)}
        onClick={() => {
          navigate('/order', {
            state: {
              totalQuantity,
              countOfItemType,
              totalAmount
            }
          });
        }}
      >
        주문 확인
      </Button>
    </div>
  );
}
