import * as styles from './CartItemList.style';
import CheckBox from '../common/CheckBox';
import { CartItemType } from '../../types/cartItem';
import Button from '../common/Button';
import { useCheckList } from '../../hooks/useCheckList';
import { useNavigate } from 'react-router';
import PriceArea from '../PriceArea/PriceArea';
import { calculateDeliveryFee, calculateOrderAmount } from '../../utils/coupon/calculate';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { useEffect } from 'react';
import { PATH } from '../../constants/path';

import { STORAGE_KEYS } from '../../constants/localStorageKey';
import CartItem from '../CartItem/CartItem';

interface CartItemListProps {
  cartItems: CartItemType[];
}

export default function CartItemList({ cartItems }: CartItemListProps) {
  const navigate = useNavigate();
  const { state, isAllChecked, toggle, checkAll, uncheckAll } = useCheckList(
    cartItems,
    (item) => item.id,
    getLocalStorageCheckedState(cartItems)
  );

  const checkedItems = getCheckedItems(cartItems, state);
  const orderAmount = calculateOrderAmount(checkedItems);
  const deliveryFee = calculateDeliveryFee(orderAmount);
  const totalAmount = orderAmount + deliveryFee;

  useEffect(() => {
    const selectedItems = checkedItems.map((item) => ({
      id: item.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      imageUrl: item.product.imageUrl
    }));
    setLocalStorage(STORAGE_KEYS.SELECTED_ITEMS, selectedItems);
  }, [checkedItems]);

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
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
          <PriceArea orderAmount={orderAmount} deliveryFee={deliveryFee} totalAmount={totalAmount} />
        </>
      )}
      <Button disabled={!Array.from(state.values()).some(Boolean)} onClick={() => navigate(PATH.ORDER)}>
        주문 확인
      </Button>
    </div>
  );
}

const getCheckedItems = (cartItems: CartItemType[], state: Map<number, boolean>): CartItemType[] => {
  return cartItems.filter((item) => state.get(item.id));
};

const getLocalStorageCheckedState = (cartItems: CartItemType[]): Map<number, boolean> => {
  const selectedItems = getLocalStorage<CartItemType[]>(STORAGE_KEYS.SELECTED_ITEMS, []);
  const selectedIds = new Set(selectedItems.map((item) => item.id));

  return new Map(cartItems.map((item) => [item.id, selectedIds.has(item.id)]));
};
