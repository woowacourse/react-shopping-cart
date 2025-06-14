import * as styles from './CartItemList.style';
import CheckBox from '../common/CheckBox';
import Button from '../common/Button';
import { useCheckList } from '../../hooks/useCheckList';
import { useNavigate } from 'react-router';
import PriceArea from '../PriceArea/PriceArea';
import { calculateDeliveryFee, calculateOrderAmount } from '../../domain/coupon/calculate';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { useEffect } from 'react';
import { PATH } from '../../constants/path';
import { STORAGE_KEYS } from '../../constants/localStorageKey';
import CartItem from '../CartItem/CartItem';
import { CartItemType } from '../../domain/mapper/cartItemMapper';

interface CartItemListProps {
  cartItems: CartItemType[];
}

export default function CartItemList({ cartItems }: CartItemListProps) {
  const navigate = useNavigate();
  const { state, isAllChecked, toggle, checkAll, uncheckAll } = useCheckList(
    cartItems,
    (item) => item.cartItemId,
    getLocalStorageCheckedState(cartItems)
  );

  const checkedItems = getCheckedItems(cartItems, state);
  const orderAmount = calculateOrderAmount(checkedItems);
  const deliveryFee = calculateDeliveryFee(orderAmount);
  const totalAmount = orderAmount + deliveryFee;

  useEffect(() => {
    setLocalStorage(STORAGE_KEYS.SELECTED_ITEMS, checkedItems);
  }, [checkedItems]);

  const isButtonDisabled = !Array.from(state.values()).some(Boolean);

  const handleButtonClick = () => {
    navigate(PATH.ORDER);
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
                key={item.cartItemId}
                item={item}
                checked={state.get(item.cartItemId) ?? false}
                onToggle={() => toggle(item.cartItemId)}
              />
            ))}
          </div>
          <PriceArea orderAmount={orderAmount} deliveryFee={deliveryFee} totalAmount={totalAmount} />
        </>
      )}
      <Button disabled={isButtonDisabled} onClick={handleButtonClick}>
        주문 확인
      </Button>
    </div>
  );
}

const getCheckedItems = (cartItems: CartItemType[], state: Map<number, boolean>): CartItemType[] => {
  return cartItems.filter((item) => state.get(item.cartItemId));
};

const getLocalStorageCheckedState = (cartItems: CartItemType[]): Map<number, boolean> => {
  const selectedItems = getLocalStorage<CartItemType[]>(STORAGE_KEYS.SELECTED_ITEMS, []);
  const selectedIds = new Set(selectedItems.map((item) => item.cartItemId));

  return new Map(cartItems.map((item) => [item.cartItemId, selectedIds.has(item.cartItemId)]));
};
