import {useNavigate} from 'react-router';
import useGetCartItem from '../../hooks/useGetCartItem';
import {useSelectedCart} from '../../hooks/useSelectedCart';
import {useShowError} from '../../provider/errorProvider';
import CheckBox from '../../components/common/CheckBox';
import Card from '../../components/feature/CartSection/CartProducts/Card';
import Button from '../../components/common/Button';
import Header from '../../components/feature/CartSection/Header';
import PriceSection from '../../components/feature/CartSection/PriceSection';
import {ROUTE_PATHS} from '../../route/path';
import {calcOrderPrice} from '../../feature/calcOrderPrice';
import {deleteCartProduct} from '../../api/cart/deleteCartProduct';
import {patchCartProduct} from '../../api/cart/patchCartProduct';

import * as S from './index.styles';
import {useSelectedItems} from '../../provider/cartItemsProvider';
import {css} from '@emotion/react';

const CartList = () => {
  const navigate = useNavigate();
  const {cartItems, refetch} = useGetCartItem();
  const {
    isAllChecked,
    isChecked,
    handleAllSelected,
    handleToggle,
    handleRemove,
  } = useSelectedCart(cartItems);
  const showError = useShowError();

  const selectedItem = useSelectedItems();

  const {orderPrice, deliveryPrice, totalPrice} = calcOrderPrice(selectedItem);

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
        <Header
          title="장바구니"
          description={
            cartItems?.length === 0
              ? ''
              : `현재 ${cartItems?.length}종류의 상품이 담겨있습니다.`
          }
        />
        {cartItems?.length === 0 ? (
          <S.EmptyCartContainer data-testid="empty-page">
            장바구니에 담은 상품이 없습니다.
          </S.EmptyCartContainer>
        ) : (
          <>
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
        disabled={selectedItem?.length === 0}
        onClick={() => navigate(ROUTE_PATHS.ORDER_CONFIRM)}
        mode="dark"
        css={css`
          padding: 24px 0;
        `}
      />
    </S.Container>
  );
};

export default CartList;
