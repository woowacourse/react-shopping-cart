import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, removeSelectedProducts } from '../../../redux';
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
  const dispatch = useDispatch();

  return (
    <Styled.Page>
      <Header>장바구니</Header>
      <Styled.Main>
        <Styled.OrderOptionsSection>
          <Styled.OrderOptionsController>
            <Checkbox label="선택해제" isChecked={isAllSelected} />
            <Styled.DeleteButton onClick={() => dispatch(removeSelectedProducts())}>
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
                onRemoveProduct={(id) => dispatch(removeProduct(id))}
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
            route={ROUTE.CHECKOUT}
          />
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Page>
  );
};
