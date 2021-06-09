import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { cartAction } from '../../redux';
import { useCart, useConfirm } from '../../hooks';
import { Checkbox, Header, RedirectNotice } from '../../components';
import { Item } from './Item';
import * as S from './style.js';
import { getFormattedAsKRW } from '../../utils';
import { ROUTE } from '../../constants';

export const CartPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { openConfirm } = useConfirm();
  const {
    products,
    selectedProducts,
    totalPrice,
    increment,
    decrement,
    removeProduct,
    removeProducts,
    toggleProduct,
    toggleAll,
  } = useCart();
  const isAllSelected = products?.length === selectedProducts?.length;
  const isAllUnselected = selectedProducts?.length === 0;

  const onClickRemoveButton = () => {
    openConfirm({
      message: `선택한 ${selectedProducts?.length}개의 상품을 삭제하시겠습니까?`,
      approve: () => removeProducts(),
    });
  };
  const onClickTrashIconButton = (productId) => {
    openConfirm({
      message: `해당 상품을 삭제하시겠습니까?`,
      approve: () => removeProduct(productId),
    });
  };
  const onClickCheckoutButton = () => {
    history.push(ROUTE.CHECKOUT);
  };

  return (
    <S.Page>
      <Header>장바구니</Header>
      <S.Main>
        {!products || products?.length === 0 ? (
          <RedirectNotice
            interjection="텅..."
            notice={`상품 목록에서 원하는 상품을 추가해 볼까요...?`}
            buttonText="쇼핑하러 가기"
            redirectRoute={ROUTE.HOME}
          />
        ) : (
          <>
            <S.OrderOptionsSection>
              <S.OrderOptionsController>
                <Checkbox
                  label={isAllSelected ? '선택해제' : '전체선택'}
                  isChecked={isAllSelected}
                  onChange={() => toggleAll(!isAllSelected)}
                />
                <S.RemoveButton onClick={onClickRemoveButton} disabled={isAllUnselected}>
                  상품삭제
                </S.RemoveButton>
              </S.OrderOptionsController>
              <S.ListLabel>
                선택상품 ({selectedProducts?.length} / {products?.length}개)
              </S.ListLabel>
              <S.CartProductList>
                {products?.map((product) => (
                  <Item
                    key={product.cartId}
                    product={product}
                    removeProduct={(id) => onClickTrashIconButton(id)}
                    toggleCheckbox={(id) => toggleProduct(id)}
                    incrementQuantity={(id) => increment(id)}
                    decrementQuantity={(id) => decrement(id)}
                    inputQuantity={(id, quantity) =>
                      dispatch(cartAction.inputProductQuantity(id, quantity))
                    }
                  />
                ))}
              </S.CartProductList>
            </S.OrderOptionsSection>
            <S.CheckoutSection>
              <S.StickyCheckoutBox
                title="결제예상금액"
                label="결제예상금액"
                price={getFormattedAsKRW(totalPrice)}
                buttonText={`주문하기(${selectedProducts?.length}개)`}
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
