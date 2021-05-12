import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { cartAction, confirmAction } from '../../../redux';
import { CartProductItem } from './CartProductItem';
import { Checkbox, Header } from '../../commons';
import * as S from './style.js';
import { getFormattedAsKRW } from '../../../utils';
import { ROUTE } from '../../../constants';

export const CartPage = () => {
  const cartProducts = useSelector(({ cartReducer }) => Object.values(cartReducer));
  const selectedProducts = cartProducts.filter(({ isSelected }) => isSelected);
  const totalPrice = selectedProducts.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0);
  const isAllSelected = cartProducts.every(({ isSelected }) => isSelected);
  const isAllUnselected = !cartProducts.some(({ isSelected }) => isSelected);

  const history = useHistory();
  const onClickCheckoutButton = () => {
    history.push(ROUTE.CHECKOUT);
  };

  const dispatch = useDispatch();
  const dispatchRemoveProduct = (id) => dispatch(cartAction.removeProduct(id));
  const dispatchRemoveSelectedProducts = () => dispatch(cartAction.removeSelectedProducts());

  const dispatchToggleProductSelection = (id) => dispatch(cartAction.toggleProductSelection(id));
  const dispatchToggleAllProductSelection = () =>
    dispatch(cartAction.toggleAllProductsSelection(!isAllSelected));

  const dispatchIncrementProductQuantity = (id) =>
    dispatch(cartAction.incrementProductQuantity(id));
  const dispatchDecrementProductQuantity = (id) =>
    dispatch(cartAction.decrementProductQuantity(id));
  const dispatchInputProductQuantity = (id, quantity) =>
    dispatch(cartAction.inputProductQuantity(id, quantity));

  const dispatchOpenConfirm = ({ message, approve }) =>
    dispatch(confirmAction.openConfirm({ message, approve }));

  const onClickDeleteButton = () =>
    dispatchOpenConfirm({
      message: `선택한 ${selectedProducts.length}개의 상품을 삭제하시겠습니까?`,
      approve: dispatchRemoveSelectedProducts,
    });
  const onClickTrashIconButton = (id) =>
    dispatchOpenConfirm({
      message: `해당 상품을 삭제하시겠습니까?`,
      approve: () => dispatchRemoveProduct(id),
    });

  return (
    <S.Page>
      <Header>장바구니</Header>
      <S.Main>
        {cartProducts.length === 0 ? (
          <S.EmptyCartContainer>
            <S.EmptyCartText>텅...</S.EmptyCartText>
            <Link to={ROUTE.HOME}>
              <S.ToProductListButton>쇼핑하러 가기</S.ToProductListButton>
            </Link>
          </S.EmptyCartContainer>
        ) : (
          <>
            <S.OrderOptionsSection>
              <S.OrderOptionsController>
                <Checkbox
                  label={isAllSelected ? '선택해제' : '전체선택'}
                  isChecked={isAllSelected}
                  onChange={dispatchToggleAllProductSelection}
                />
                <S.DeleteButton onClick={onClickDeleteButton} disabled={isAllUnselected}>
                  상품삭제
                </S.DeleteButton>
              </S.OrderOptionsController>
              <S.ListLabel>
                선택상품 ({selectedProducts.length} / {cartProducts.length}개)
              </S.ListLabel>
              <S.CartProductList>
                {cartProducts.map((product) => (
                  <CartProductItem
                    key={product.id}
                    product={product}
                    removeProduct={onClickTrashIconButton}
                    toggleCheckbox={dispatchToggleProductSelection}
                    incrementQuantity={dispatchIncrementProductQuantity}
                    decrementQuantity={dispatchDecrementProductQuantity}
                    inputQuantity={dispatchInputProductQuantity}
                  />
                ))}
              </S.CartProductList>
            </S.OrderOptionsSection>
            <S.CheckoutSection>
              <S.StickyCheckoutBox
                title="결제예상금액"
                label="결제예상금액"
                price={getFormattedAsKRW(totalPrice)}
                buttonText={`주문하기(${selectedProducts.length}개)`}
                buttonDisabled={isAllUnselected}
                onClickButton={onClickCheckoutButton}
              />
            </S.CheckoutSection>
          </>
        )}
      </S.Main>
    </S.Page>
  );
};
