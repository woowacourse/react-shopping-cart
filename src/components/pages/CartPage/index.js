import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAction } from '../../../redux';
import { CartProductItem } from './CartProductItem';
import { Checkbox, Header } from '../../commons';
import * as Styled from './style.js';
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
  const dispatchRemoveProduct = (id) => dispatch(getAction.removeProduct(id));
  const dispatchRemoveSelectedProducts = () => dispatch(getAction.removeSelectedProducts());
  const dispatchToggleProductSelection = (id) => dispatch(getAction.toggleProductSelection(id));
  const dispatchToggleAllProductSelection = () =>
    dispatch(getAction.toggleAllProductsSelection(!isAllSelected));
  const dispatchIncrementProductQuantity = (id) => dispatch(getAction.incrementProductQuantity(id));
  const dispatchDecrementProductQuantity = (id) => dispatch(getAction.decrementProductQuantity(id));
  const dispatchInputProductQuantity = (id, quantity) =>
    dispatch(getAction.inputProductQuantity(id, quantity));

  return (
    <Styled.Page>
      <Header>장바구니</Header>
      <Styled.Main>
        <Styled.OrderOptionsSection>
          <Styled.OrderOptionsController>
            <Checkbox
              label={isAllSelected ? '선택해제' : '전체선택'}
              isChecked={isAllSelected}
              onChange={dispatchToggleAllProductSelection}
            />
            <Styled.DeleteButton
              onClick={dispatchRemoveSelectedProducts}
              disabled={isAllUnselected}
            >
              상품삭제
            </Styled.DeleteButton>
          </Styled.OrderOptionsController>
          <Styled.ListLabel>
            선택상품 ({selectedProducts.length} / {cartProducts.length}개)
          </Styled.ListLabel>
          <Styled.CartProductList>
            {cartProducts.map((product) => (
              <CartProductItem
                key={product.id}
                product={product}
                removeProduct={dispatchRemoveProduct}
                toggleCheckbox={dispatchToggleProductSelection}
                incrementQuantity={dispatchIncrementProductQuantity}
                decrementQuantity={dispatchDecrementProductQuantity}
                inputQuantity={dispatchInputProductQuantity}
              />
            ))}
          </Styled.CartProductList>
        </Styled.OrderOptionsSection>
        <Styled.CheckoutSection>
          <Styled.StickyCheckoutBox
            title="결제예상금액"
            label="결제예상금액"
            price={getFormattedAsKRW(totalPrice)}
            buttonText={`주문하기(${selectedProducts.length}개)`}
            buttonDisabled={isAllUnselected}
            onClickButton={onClickCheckoutButton}
          />
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Page>
  );
};
