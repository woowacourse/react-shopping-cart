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

  const selectedItem =
    cartItems?.filter(
      (item: CartProduct) => selectedCartId.indexOf(item.id) > -1
    ) || [];

  const {orderPrice, deliveryPrice, totalAmount, totalPrice} =
    calcOrderHistory(selectedItem);

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
                  onRefetch={refetch}
                  isChecked={isChecked(cartItem.id)}
                  onToggle={() => handleToggle(cartItem.id)}
                  onRemove={() => handleRemove(cartItem.id)}
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
