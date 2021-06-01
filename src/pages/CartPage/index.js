import { useHistory } from 'react-router-dom';
import { CartProductItem } from './CartProductItem';
import { Checkbox, Header, RedirectNotice } from '../../components';
import * as S from './style.js';
import { useCartDispatch, useCartProduct, useConfirm } from '../../hooks';
import { getFormattedAsKRW } from '../../utils';
import { ROUTE } from '../../constants';

export const CartPage = () => {
  const {
    cartProducts,
    selectedProducts,
    totalPrice,
    isAllSelected,
    isAllUnselected,
  } = useCartProduct();

  const {
    removeProduct,
    removeSelectedProducts,
    toggleProductSelection,
    toggleAllProductsSelection,
    incrementProductQuantity,
    decrementProductQuantity,
    inputProductQuantity,
  } = useCartDispatch();

  const history = useHistory();
  const onClickCheckoutButton = () => {
    history.push(ROUTE.CHECKOUT);
  };

  const { openConfirmWith } = useConfirm();

  const onClickDeleteButton = () =>
    openConfirmWith({
      message: `선택한 ${selectedProducts.length}개의 상품을 삭제하시겠습니까?`,
      approve: () => removeSelectedProducts(),
    });
  const onClickTrashIconButton = (id) =>
    openConfirmWith({
      message: `해당 상품을 삭제하시겠습니까?`,
      approve: () => removeProduct(id),
    });

  return (
    <S.Page>
      <Header>장바구니</Header>
      <S.Main>
        {cartProducts.length === 0 ? (
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
                  onChange={toggleAllProductsSelection}
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
                    toggleCheckbox={toggleProductSelection}
                    incrementQuantity={incrementProductQuantity}
                    decrementQuantity={decrementProductQuantity}
                    inputQuantity={inputProductQuantity}
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
