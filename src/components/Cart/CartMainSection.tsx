import { css } from '@emotion/react';
import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CartItem from '@/components/CartItem/CartItem';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import HeaderTitleContainer from '@/components/common/HeaderTitleContainer/HeaderTitleContainer';
import OrderInfo from '@/components/common/PriceSection/PriceSection';
import { cartItemsState } from '@recoil/cartItems/atoms';
import { allCheckedState } from '@recoil/cartItems/selectors';

export default function CartMainSection() {
  const cartItems = useRecoilValue(cartItemsState);
  const [allChecked, setAllChecked] = useRecoilState(allCheckedState);

  if (cartItems.length === 0) {
    return (
      <div css={cartEmptyContainer}>
        <span css={cartEmptyText}>장바구니에 담은 상품이 없습니다.</span>
      </div>
    );
  }

  return (
    <main css={main}>
      <HeaderTitleContainer
        title="장바구니"
        description={`현재 ${cartItems.length}종류의 상품이 담겨있습니다.`}
      />
      <section css={cartMainSection}>
        <div css={allCheckboxWrapper}>
          <Checkbox
            checked={allChecked}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAllChecked(e.target.checked)}
            htmlFor="allChecked"
            label="전체 선택"
          />
        </div>
        <ul>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))}
        </ul>
      </section>
      <OrderInfo type="CART" />
    </main>
  );
}

const main = css`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;

  padding: 0 24px;

  overflow-y: scroll;
`;

const cartMainSection = css`
  padding-bottom: 42px;
`;

const allCheckboxWrapper = css`
  margin-bottom: 10px;
`;

const cartEmptyContainer = css`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const cartEmptyText = css`
  font-size: 16px;
  font-weight: 400;
`;
