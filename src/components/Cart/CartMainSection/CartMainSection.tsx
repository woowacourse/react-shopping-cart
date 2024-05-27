import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  allCheckboxWrapper,
  cartEmptyContainer,
  cartEmptyText,
  cartMainSection,
  main,
} from './CartMainSection.styled';

import CartItem from '@/components/CartItem/CartItem';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import HeaderTitleContainer from '@/components/common/HeaderTitleContainer/HeaderTitleContainer';
import PriceSection from '@/components/common/PriceSection/PriceSection';
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
      <PriceSection type="CART" />
    </main>
  );
}
