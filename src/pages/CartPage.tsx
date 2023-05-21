import { styled } from 'styled-components';
import CartItemListItem from '../components/CartItemListItem';
import CartOrder from '../components/CartOrder';
import Checkbox from '../components/Checkbox';
import useCartActions from '../hooks/useCartActions';
import useCartOrder from '../hooks/useCartOrder';

const Header = styled.header`
  padding-bottom: 32px;

  border-bottom: 4px solid #333333;

  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;

const CartLayout = styled.article`
  display: flex;

  margin-top: 32px;
`;

const CartItemListSection = styled.section`
  flex: 1;
  max-width: 720px;
`;

const CartItemListCaption = styled.h2`
  margin-bottom: 16px;

  font-size: 20px;
`;

const CartItemList = styled.ul`
  border-top: 4px solid #aaaaaa;

  & > * + * {
    border-top: 1.5px solid #cccccc;
  }
`;

const CartItemListItemContainer = styled.li`
  display: flex;
  gap: 16px;

  padding: 32px 0;
`;

const CartItemListController = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CartItemSelected = styled.p`
  font-size: 16px;
`;

const DeleteSelectedButton = styled.button`
  padding: 6px;

  border: 1px solid #bbbbbb;
  font-size: 16px;
`;

const CartOrderSection = styled.section`
  margin-left: auto;
`;

const CartPage = () => {
  const { cartItems, deleteCartItems } = useCartActions();
  const { selectedCount, allSelected, selectForOrder, toggleForOrder, unselectAllForOrder } =
    useCartOrder();

  const handleEnableAll = () => {
    if (allSelected) {
      unselectAllForOrder();
      return;
    }
    cartItems.forEach((cartItem) => selectForOrder(cartItem.id));
  };

  const handleDeleteSelected = () => {
    unselectAllForOrder();
    deleteCartItems(cartItems.map((cartItem) => cartItem.id));
  };

  return (
    <>
      <Header>장바구니</Header>

      <CartLayout>
        <CartItemListSection>
          <CartItemListCaption>배송 상품 ({cartItems.length}개)</CartItemListCaption>
          <CartItemList>
            {cartItems.map((cartItem) => (
              <CartItemListItemContainer>
                <Checkbox
                  value={!cartItem.unselectedForOrder}
                  onChange={() => toggleForOrder(cartItem.id)}
                />
                <CartItemListItem
                  key={cartItem.id}
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                />
              </CartItemListItemContainer>
            ))}
          </CartItemList>

          <CartItemListController>
            <Checkbox value={allSelected} onChange={handleEnableAll} />
            <CartItemSelected>
              전체선택 ({selectedCount}/{cartItems.length}개)
            </CartItemSelected>
            <DeleteSelectedButton onClick={handleDeleteSelected}>선택삭제</DeleteSelectedButton>
          </CartItemListController>
        </CartItemListSection>

        <CartOrderSection>
          <CartOrder isCartEmpty={selectedCount === 0} />
        </CartOrderSection>
      </CartLayout>
    </>
  );
};

export default CartPage;
