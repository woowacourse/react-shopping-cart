import CartItemBox from '../../../CarItem/components/CartItemBox/CartItemBox';

import {
  StyleCartItemListWrapper,
  StyleCheckAllSpan,
  StyleDeleteCheckedBox,
  StyleCartWrapper,
} from './CartItemList.style';
import CheckBox from '../../../../common/CheckBox/CheckBox';
import { useCart, useProductListInCart } from '../../../../recoil/cart/cartState';

function CartItemListContainer() {
  const productListInCart = useProductListInCart();

  const { isAllChecked, checkedCount, toggleAllCartItem, deleteCheckedItems } = useCart();

  const productCount = productListInCart.length;

  if (productCount === 0) {
    return (
      <StyleCartWrapper>
        <span style={{ textAlign: 'center', fontSize: '30px', margin: 'auto' }}>텅</span>
      </StyleCartWrapper>
    );
  }

  return (
    <StyleCartWrapper>
      {productListInCart.map(({ id, imageUrl, name, price }) => {
        return (
          <li key={id}>
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
    </StyleCartWrapper>
  );
}

export default CartItemListContainer;
