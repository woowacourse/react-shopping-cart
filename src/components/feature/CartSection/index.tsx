import * as S from './CartSection.styles';
import Card from './CartProducts/Card';
import Header from './Header';
import CheckBox from '../../common/CheckBox';
import PriceSection from './PriceSection';
import useGetCartItem from '../../../hooks/useGetCartItem';
import {CartProduct} from '../../../type/cart';
import Button from '../../common/Button';
import {useNavigate} from 'react-router';
import {css} from '@emotion/react';
import {useSelectedCart} from '../../../hooks/useSelectedCart';
import {ROUTE_PATHS} from '../../../route/path';
import {calcOrderHistory} from '../../../feature/calcOrderHistory';
import {useShowError} from '../../../provider/errorProvider';
import {deleteCartProduct} from '../../../api/cart/deleteCartProduct';
import {patchCartProduct} from '../../../api/cart/patchCartProduct';

const styleButton = css`
  width: 100%;
  padding: 24px 0;
  background-color: #000;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
`;

const CartSection = () => {
  const navigate = useNavigate();
  const {cartItems, refetch} = useGetCartItem();
  const {
    selectedCartId,
    isAllChecked,
    isChecked,
    handleAllSelected,
    handleToggle,
    handleRemove,
  } = useSelectedCart(cartItems);
  const showError = useShowError();

  const selectedItem =
    cartItems?.filter(
      (item: CartProduct) => selectedCartId.indexOf(item.id) > -1
    ) || [];

  const {orderPrice, deliveryPrice, totalAmount, totalPrice} =
    calcOrderHistory(selectedItem);

  const handleDelete = async (id: number) => {
    try {
      await deleteCartProduct(id);
      handleRemove(id);
      refetch();
    } catch (e) {
      showError?.('데이터를 삭제하는 중 문제가 발생했습니다.');
    }
  };

  const handlePatch = async (id: number, updatedQuantity: number) => {
    try {
      await patchCartProduct(id, updatedQuantity);
      refetch();
    } catch (e) {
      showError?.('상품을 추가/삭제하는 중 문제가 발생했습니다.');
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <Header />
        {cartItems?.length === 0 ? (
          <S.EmptyCartContainer data-testid="empty-page">
            장바구니에 담은 상품이 없습니다.
          </S.EmptyCartContainer>
        ) : (
          <>
            <S.Description>
              현재 {cartItems?.length}종류의 상품이 담겨있습니다.
            </S.Description>
            <CheckBox
              label="전체 선택"
              isChecked={isAllChecked}
              onChange={handleAllSelected}
              testId="all-selected"
            />
            <S.CartList data-testid="cart-list">
              {cartItems?.map((cartItem) => (
                <Card
                  key={cartItem.id}
                  cartItem={cartItem}
                  isChecked={isChecked(cartItem.id)}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onPatch={handlePatch}
                />
              ))}
            </S.CartList>

            <PriceSection
              orderPrice={orderPrice}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
            />
          </>
        )}
      </S.Wrapper>
      <Button
        testId="order-confirm-button"
        title="주문 확인"
        disabled={selectedCartId?.length === 0}
        onClick={() =>
          navigate(ROUTE_PATHS.CONFIRM, {
            state: {
              sort: selectedCartId.length,
              totalAmount: totalAmount,
              totalPrice: totalPrice,
            },
          })
        }
        css={styleButton}
      />
    </S.Container>
  );
};

export default CartSection;
