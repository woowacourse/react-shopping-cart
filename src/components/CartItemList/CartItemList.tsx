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
  const itemIds = cartItems.map((item) => item.id);
  const { state, isAllChecked, toggle, checkAll, uncheckAll } = useCheckList(itemIds);
  const navigate = useNavigate();

  const checkedItems = cartItems.filter((item) => state[item.id]);
  const orderAmount = checkedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = orderAmount > 100000 ? 0 : 3000;
  const totalAmount = orderAmount + deliveryFee;

  const countOfItemType = checkedItems.length;
  const countOfItem = checkedItems.reduce((acc, item) => acc + item.quantity, 0);

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
          <PriceArea orderAmount={orderAmount} deliveryFee={deliveryFee} totalAmount={totalAmount} />
        </>
      )}
      <Button
        disabled={!Object.values(state).some(Boolean)}
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
