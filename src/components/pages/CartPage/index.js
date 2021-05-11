import { useSelector, useDispatch } from 'react-redux';
import {
  removeProduct,
  removeSelectedProducts,
  toggleProductSelection,
  toggleAllProductsSelection,
} from '../../../redux';
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
  const dispatch = useDispatch();
  const dispatchRemoveProduct = (id) => dispatch(removeProduct(id));
  const dispatchToggleProductSelection = (id) => dispatch(toggleProductSelection(id));

  return (
    <Styled.Page>
      <Header>장바구니</Header>
      <Styled.Main>
        <Styled.OrderOptionsSection>
          <Styled.OrderOptionsController>
            <Checkbox
              label={isAllSelected ? '선택해제' : '전체선택'}
              isChecked={isAllSelected}
              onChange={() => dispatch(toggleAllProductsSelection(!isAllSelected))}
            />
            <Styled.DeleteButton
              onClick={() => dispatch(removeSelectedProducts())}
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
                onRemoveProduct={dispatchRemoveProduct}
                onToggleCheckbox={dispatchToggleProductSelection}
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
            route={ROUTE.CHECKOUT}
          />
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Page>
  );
};
