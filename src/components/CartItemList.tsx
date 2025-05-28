import { css } from '@emotion/react';
import CheckBox from './CheckBox';
import CartItem from './CartItem';
import { CartItemType } from '../types/cartItem';
import Button from './Button';
import { useCheckList } from '../hooks/useCheckList';

interface CartItemListProps {
  cartItems: CartItemType[];
}

export default function CartItemList({ cartItems }: CartItemListProps) {
  const itemIds = cartItems?.map((item) => item.id);
  const { state, isAllChecked, toggle, checkAll, uncheckAll } = useCheckList(itemIds);

  return (
    <div css={cartItemsAreaCss}>
      {cartItems.length === 0 ? (
        <p>장바구니에 담은 상품이 없습니다.</p>
      ) : (
        <>
          <div css={allSelectCss}>
            <CheckBox checked={isAllChecked} onChange={isAllChecked ? uncheckAll : checkAll} />
            <p>전체 선택</p>
          </div>
          <div css={cartItemsListCss}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                checked={state[item.id]}
                handleCheckBoxChange={() => toggle(item.id)}
              />
            ))}
          </div>
        </>
      )}
      <Button disabled={!Object.values(state).some(Boolean)}>주문 확인</Button>
    </div>
  );
}

const cartItemsAreaCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
});

const allSelectCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  marginBottom: '16px'
});
const cartItemsListCss = css({
  width: '100%',
  height: '50dvh',
  overflow: 'scroll'
});
