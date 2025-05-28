import * as styles from './CartItemList.style';
import CheckBox from '../common/CheckBox';
import CartItem from '../CartItem/CartItem';
import { CartItemType } from '../../types/cartItem';
import Button from '../common/Button';
import { useCheckList } from '../../hooks/useCheckList';
import { useNavigate } from 'react-router';
import PriceArea from '../PriceArea/PriceArea';

interface CartItemListProps {
  cartItems: CartItemType[];
}

export default function CartItemList({ cartItems }: CartItemListProps) {
  const { state, isAllChecked, toggle, checkAll, uncheckAll } = useCheckList(cartItems, (item) => item.id);

  const navigate = useNavigate();
  const { orderAmount, deliveryFee, totalAmount, countOfItemType, countOfItem } = calculateSummary({
    cartItems,
    state
  });

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
                checked={state.get(item.id) ?? false}
                handleCheckBoxChange={() => toggle(item.id)}
              />
            ))}
          </div>
          <PriceArea orderAmount={orderAmount} deliveryFee={deliveryFee} totalAmount={totalAmount} />
        </>
      )}
      <Button
        disabled={!Array.from(state.values()).some(Boolean)}
        onClick={() => {
          navigate('/order', {
            state: {
              countOfItem,
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

const calculateSummary = ({ cartItems, state }: { cartItems: CartItemType[]; state: Map<number, boolean> }) => {
  const checkedItems = cartItems.filter((item) => state.get(item.id));
  const orderAmount = checkedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = orderAmount > 100000 ? 0 : 3000;
  const totalAmount = orderAmount + deliveryFee;

  const countOfItemType = checkedItems.length;
  const countOfItem = checkedItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    orderAmount,
    deliveryFee,
    totalAmount,
    countOfItemType,
    countOfItem
  };
};
