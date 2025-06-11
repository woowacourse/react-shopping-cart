import * as styles from './CartItemList.style';
import CheckBox from '../common/CheckBox';
import CartItem from '../CartItem/CartItem';
import { CartItemType } from '../../types/cartItem';
import Button from '../common/Button';
import { useCheckList } from '../../hooks/useCheckList';
import { useNavigate } from 'react-router';
import PriceArea from '../PriceArea/PriceArea';
import { useCartSummary } from '../../hooks/useCartSummary';

interface CartItemListProps {
  cartItems: CartItemType[];
}

function CartItemList({ cartItems }: CartItemListProps) {
  const navigate = useNavigate();
  const { state, isAllChecked, toggle, checkAll, uncheckAll, deleteCheckedItems } = useCheckList(
    cartItems,
    (item) => item.id
  );

  const checkedItems = cartItems.filter((item) => state.get(item.id));
  const { orderAmount, deliveryFee, totalQuantity, totalAmount, countOfItemType } = useCartSummary(checkedItems);

  const navigateToOrder = () => {
    navigate('/order', {
      state: {
        totalQuantity,
        countOfItemType,
        checkedItems,
        deliveryFee,
        orderAmount
      }
    });
  };

  return (
    <div css={styles.cartItemsAreaCss}>
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
            handleDeleteCheck={() => deleteCheckedItems(item.id)}
          />
        ))}
      </div>
      <PriceArea orderAmount={orderAmount} deliveryFee={deliveryFee} totalAmount={totalAmount} />
      <Button disabled={!Array.from(state.values()).some(Boolean)} onClick={navigateToOrder}>
        주문 확인
      </Button>
    </div>
  );
}

export default CartItemList;
