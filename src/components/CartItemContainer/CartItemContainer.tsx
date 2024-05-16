import { removeCartItem, updateCartItemQuantity } from '../../apis';

import CartItem from '../CartItem/CartItem';
import CheckBox from '../CheckBox/CheckBox';
import { currentCartItemsState } from '../../recoil/atoms';
import { removeCartItem, updateCartItemQuantity } from '../../apis';
import useCheckedItemIds from '../../hooks/useCheckedItemIds';

export default function CartItemContainer() {
  const [items, setItems] = useRecoilState(currentCartItemsState);
  const { getIsChecked, checkId, uncheckId, deleteId } = useCheckedItemIds();

  const ids = items.map((item) => item.id);
  const isAllChecked = ids.every((id) => getIsChecked(id));

  const handleAllCheck = () => {
    checkId(...ids);
  };

  const handleAllUncheck = () => {
    uncheckId(...ids);
  };

  const handleDeleteItem = async (cartItemId: number) => {
    await removeCartItem(cartItemId);
    deleteId(cartItemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    await updateCartItemQuantity(cartItemId, quantity);
  };

  return (
    <>
      {items.length > 0 && (
        <Description>{`현재 ${items.length}종류의 상품이 담겨있습니다.`}</Description>
      )}
      <CartItemListContainer>
        <CheckAllBoxContainer>
          <CheckBox
            isChecked={isAllChecked}
            onClick={isAllChecked ? handleAllUncheck : handleAllCheck}
          />
          <span>전체선택</span>
        </CheckAllBoxContainer>

        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              cartItemId={item.id}
              product={item.product}
              quantity={item.quantity}
              handleDelete={(cartItemId: number) => {
                handleDeleteItem(cartItemId);
              }}
              handleIncreaseQuantity={(cartItemId: number, quantity: number) => {
                handleUpdateQuantity(cartItemId, quantity);
              }}
              handleDecreaseQuantity={(cartItemId: number, quantity: number) => {
                handleUpdateQuantity(cartItemId, quantity);
              }}
            />
          );
        })}
      </CartItemListContainer>
    </>
  );
}
const Description = styled.h3({
  fontSize: '12px',
  fontWeight: '500',
  color: '#0A0D13',
  marginTop: '12px',
});

const CheckAllBoxContainer = styled.div({
  height: '24px',
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
  marginBottom: '20px',
});

const CartItemListContainer = styled.ul({
  margin: '36px 0',
});
