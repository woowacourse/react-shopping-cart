import { useProductListInCart, useCheckCart } from '../../hooks/cartListState/cartListState';
import { FlexColWrapper, FlexWrapper } from '../../pages/Cart/Cart.style';
import CartItemBox from '../CartItemBox/CartItemBox';
import { StyleCartItemWrapper } from '../CartItemBox/CartItemBox.steyle';
import CheckBox from '../common/CheckBox/CheckBox';
import {
  StyleCartItemListWrapper,
  StyleCheckAllSpan,
  StyleDeleteCheckedBox,
} from './CartItemList.style';

function CartItemListContainer() {
  const productListInCart = useProductListInCart();
  const { isAllChecked, checkedCount, toggleAllCartItem, deleteCheckedItems } = useCheckCart();

  const productCount = productListInCart.length;

  return (
    <FlexColWrapper>
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
    </FlexColWrapper>
  );
}

export default CartItemListContainer;
