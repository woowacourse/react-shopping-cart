import * as styles from './CartItemList.style';
import CheckBox from '../common/CheckBox';
import CartItem from '../CartItem/CartItem';
import { CartItemType } from '../../types/cartItem';
import Button from '../common/Button';
import { useCheckList } from '../../hooks/useCheckList';
import { useNavigate } from 'react-router';
import PriceArea from '../PriceArea/PriceArea';
import { calculateDeliveryFee, calculateOrderAmount } from './calculate';

interface CartItemListProps {
  cartItems: CartItemType[];
}

export default function CartItemList({ cartItems }: CartItemListProps) {
  const { state, isAllChecked, toggle, checkAll, uncheckAll } = useCheckList(cartItems, (item) => item.id);
  const navigate = useNavigate();

  const checkedItems = getCheckedItems(cartItems, state);
  const orderAmount = calculateOrderAmount(checkedItems);
  const deliveryFee = calculateDeliveryFee(orderAmount);
  const totalAmount = orderAmount + deliveryFee;

  const handleConfirmButtonClick = () => {
    const selectedItems = checkedItems.map((item) => ({
      id: item.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      imageUrl: item.product.imageUrl
    }));

    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  };
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
      )}
      <Button
        disabled={!Array.from(state.values()).some(Boolean)}
        onClick={() => {
          handleConfirmButtonClick();
          navigate('/order');
        }}
      >
        주문 확인
      </Button>
    </div>
  );
}

const getCheckedItems = (cartItems: CartItemType[], state: Map<number, boolean>): CartItemType[] => {
  return cartItems.filter((item) => state.get(item.id));
};
