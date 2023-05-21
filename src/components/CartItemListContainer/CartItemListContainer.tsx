import { useProductListInCart, useCheckCart } from '../../hooks/cartListState/cartListState';
import { FlexColWrapper, FlexWrapper } from '../../pages/Cart/Cart.style';
import CartItemBox from '../CartItemBox/CartItemBox';
import CheckBox from '../common/CheckBox/CheckBox';

function CartItemListContainer() {
  const productListInCart = useProductListInCart();
  const { isAllChecked, checkedCount, toggleAllCartItem, deleteCheckedItems } = useCheckCart();

  const productCount = productListInCart.length;

  return (
    <FlexColWrapper>
      <span>상품 개수: {productCount}</span>
      {productListInCart.map(({ id, imageUrl, name, price }) => {
        return (
          <li key={id}>
            {/* id: CartItem */}
            <CartItemBox id={id} imageUrl={imageUrl} name={name} price={price} />
          </li>
        );
      })}
      <FlexWrapper>
        <CheckBox
          type="checkbox"
          checked={isAllChecked}
          onChange={() => {
            toggleAllCartItem();
          }}
        />
        <span>{`${checkedCount} / ${productCount}`}</span>
        <button onClick={deleteCheckedItems}>선택삭제</button>
      </FlexWrapper>
    </FlexColWrapper>
  );
}

export default CartItemListContainer;
