import { useProductListInCart, useCheckCart } from '../../hooks/cartListState/cartListState';

import CartItemBox from '../CartItemBox/CartItemBox';

import CheckBox from '../common/CheckBox/CheckBox';
import {
  StyleCartItemListWrapper,
  StyleCheckAllSpan,
  StyleDeleteCheckedBox,
  StyleWrapper,
} from './CartItemList.style';

function CartItemListContainer() {
  const productListInCart = useProductListInCart();

  const { isAllChecked, checkedCount, toggleAllCartItem, deleteCheckedItems } = useCheckCart();

  const productCount = productListInCart.length;

  if (productCount === 0) {
    return (
      <StyleWrapper>
        <span style={{ textAlign: 'center', fontSize: '30px', margin: 'auto' }}>텅</span>
      </StyleWrapper>
    );
  }

  return (
    <StyleWrapper>
      {productListInCart.map(({ id, imageUrl, name, price }) => {
        return (
          <li key={id}>
            {/* id: CartItem */}
            <CartItemBox id={id} imageUrl={imageUrl} name={name} price={price} />
          </li>
        );
      })}
      <StyleCartItemListWrapper>
        <CheckBox
          type="checkbox"
          checked={isAllChecked}
          onChange={() => {
            toggleAllCartItem();
          }}
        />
        <StyleCheckAllSpan>{`전체 선택 (${checkedCount} / ${productCount})`}</StyleCheckAllSpan>
        <StyleDeleteCheckedBox onClick={deleteCheckedItems}>선택삭제</StyleDeleteCheckedBox>
      </StyleCartItemListWrapper>
    </StyleWrapper>
  );
}

export default CartItemListContainer;
