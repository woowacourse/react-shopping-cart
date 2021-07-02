import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import PageHeader from 'components/shared/PageHeader/PageHeader';
import PriceOverview from 'components/units/PriceOverview/PriceOverview';
import CartItem from 'components/units/CartItem/CartItem';
import HighlightText from 'components/shared/HighlightText/HighlightText';
import Button from 'components/shared/Button/Button';
import * as T from 'types';
import Spinner from 'components/shared/Spinner/Spinner';
import ROUTES from 'constants/routes';
import { toPriceFormat } from 'utils';
import useCartPage from 'hooks/useCartPage';
import Styled from './CartPage.styles';

const CartPage = (): ReactElement => {
  const {
    cartItems,
    checkedItems,
    isInitialLoading,
    isAllChecked,
    checkedItemsTotalPrice,
    onDeleteItem,
    onDeleteCheckedItem,
    onCheck,
    onCheckAll,
  } = useCartPage();

  return (
    <Styled.Root>
      <PageHeader title="장바구니" />
      {isInitialLoading ? (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      ) : (
        <Styled.Cart>
          <Styled.CartListContainer>
            <Styled.CartListOption>
              <Checkbox
                labelText="전체 선택"
                checked={isAllChecked}
                onChange={onCheckAll}
                disabled={cartItems.length === 0}
              />
              <Styled.DeleteButton onClick={onDeleteCheckedItem} disabled={checkedItems.length === 0}>
                선택 삭제
              </Styled.DeleteButton>
            </Styled.CartListOption>
            <Styled.CartListHeader>든든배송 상품 ({cartItems.length}개)</Styled.CartListHeader>
            {cartItems.length === 0 ? (
              <Styled.NoResultMessage>🛒 장바구니가 비어있어요!</Styled.NoResultMessage>
            ) : (
              <Styled.CartItemList>
                {cartItems?.map?.((cartItem) => (
                  <CartItem key={cartItem.cartId} cartItem={cartItem} onCheck={onCheck} onDelete={onDeleteItem} />
                ))}
              </Styled.CartItemList>
            )}
          </Styled.CartListContainer>
          <Styled.PriceOverviewWrapper>
            <PriceOverview headerText="결제예상금액">
              <Styled.HighlightTextWrapper>
                <HighlightText text="결제예상금액" />
                <HighlightText text={`${toPriceFormat(checkedItemsTotalPrice)}원`} />
              </Styled.HighlightTextWrapper>
              <Link to={{ pathname: ROUTES.ORDER, state: { checkedItems } }}>
                <Button
                  fullWidth
                  text={`주문하기 (${checkedItems.length}개)`}
                  size={T.ButtonSize.REGULAR}
                  disabled={checkedItems.length === 0}
                />
              </Link>
            </PriceOverview>
          </Styled.PriceOverviewWrapper>
        </Styled.Cart>
      )}
    </Styled.Root>
  );
};

export default CartPage;
