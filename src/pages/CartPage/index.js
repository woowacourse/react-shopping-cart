import { useHistory } from 'react-router-dom';

import { useCart, useConfirm } from '../../hooks';
import { Checkbox, Header, RedirectNotice } from '../../components';
import { Item } from './Item';
import * as S from './style.js';
import { ROUTE, API_CALL_DELAY } from '../../constants';
import { throttle } from '../../utils/throttle';

export const CartPage = () => {
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

  const handleRemoveProducts = () => {
    openConfirm({
      message: `선택한 ${selectedProducts?.length}개의 상품을 삭제하시겠습니까?`,
      approve: throttle(() => removeProducts(), API_CALL_DELAY),
    });
  };
  const handleRemoveProduct = (productId) => {
    openConfirm({
      message: `해당 상품을 삭제하시겠습니까?`,
      approve: throttle(() => removeProduct(productId), API_CALL_DELAY),
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
                <S.RemoveButton onClick={handleRemoveProducts} disabled={isAllUnselected}>
                  상품삭제
                </S.RemoveButton>
              </S.OrderOptionsController>
              <S.ListLabel>
                선택상품 ({selectedProducts?.length} / {products?.length}개)
              </S.ListLabel>
              <S.CartProductList>
                {products?.map((product) => {
                  const { cartId, productId } = product;

                  return (
                    <Item
                      key={cartId}
                      product={product}
                      onClickTrashCanButton={() => handleRemoveProduct(productId)}
                      toggleCheckbox={() => toggleProduct(productId)}
                      incrementQuantity={throttle(() => increment(productId), API_CALL_DELAY)}
                      decrementQuantity={throttle(() => decrement(productId), API_CALL_DELAY)}
                    />
                  );
                })}
              </S.CartProductList>
            </S.OrderOptionsSection>
            <S.CheckoutSection>
              <S.StickyCheckoutBox
                title="결제예상금액"
                label="결제예상금액"
                price={totalPrice}
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
