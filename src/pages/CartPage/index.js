import React from 'react';

import QuantityInput from '../../components/common/QuantityInput';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import FlexContainer from '../../components/common/FlexContainer';
import TrashBin from '../../components/common/Icon/TrashBin';
import Loader from '../../components/common/Loader';
import Spinner from '../../components/common/Icon/Spinner';
import Main from '../../components/Main';
import PageTitle from '../../components/shared/PageTitle';
import PriceInfoBox from '../../components/shared/PriceInfoBox';
import ProductList from '../../components/shared/ProductList';
import ProductListItem from '../../components/shared/ProductList/ProductListItem';

import { PAGES } from '../../constants/appInfo';
import { APP_MESSAGE } from '../../constants/message';
import PALETTE from '../../constants/palette';

import useCart from '../../hooks/useCart';
import useSnackbar from '../../hooks/useSnackbar';

import * as Styled from './style';

const CartPage = () => {
  const {
    cartList,
    isLoading,
    isAllChecked,
    changeCheckbox,
    changeAllCheckbox,
    removeCheckedCartProducts,
    removeCartProduct,
    changeCartProductQuantity,
    calculateTotalPrice,
  } = useCart();
  const [snackbarMessage, setSnackbarMessage] = useSnackbar();
  const totalPrice = calculateTotalPrice();

  const onRemoveCheckedProducts = () => {
    removeCheckedCartProducts();

    setSnackbarMessage(APP_MESSAGE.CART_PRODUCT_REMOVED);
  };

  const onRemoveProduct = (cartId) => () => {
    removeCartProduct(cartId);

    setSnackbarMessage(APP_MESSAGE.CART_PRODUCT_REMOVED);
  };

  const onChangeQuantity = (cartId) => (quantity) => {
    changeCartProductQuantity(cartId, quantity);
  };

  const onCheckout = () => {
    if (!confirm(APP_MESSAGE.ORDER_CONFIRMATION)) return;

    const isCheckoutAvailable = cartList.length && cartList.some((product) => product.isChecked);
    if (!isCheckoutAvailable) {
      alert(APP_MESSAGE.NO_PRODUCTS_TO_ORDER);
      return;
    }

    window.location.hash = `#${PAGES.CHECKOUT.ADDRESS}`;
  };

  return (
    <Main>
      <PageTitle>{PAGES.CART.NAME}</PageTitle>
      <Loader animationType={'spin'} isLoading={isLoading}>
        <Spinner width={'8rem'} color={PALETTE.BAEMINT} />
      </Loader>
      <FlexContainer align="flex-start">
        <FlexContainer width="58%" margin="3rem auto 0 1.5rem" direction="column">
          <FlexContainer justifyContent="space-between" align="flex-start">
            <Checkbox onChange={changeAllCheckbox} isChecked={isAllChecked}>
              {isAllChecked ? '선택해제' : '전체선택'}
            </Checkbox>
            <Button
              onClick={onRemoveCheckedProducts}
              backgroundColor={PALETTE.WHITE}
              borderColor={PALETTE.GRAY_002}
              width="7.3rem"
              height="3rem"
            >
              상품삭제
            </Button>
          </FlexContainer>
          <Styled.ProductListTitle>든든배송 상품 ({cartList?.length}개)</Styled.ProductListTitle>
          <ProductList width="100%">
            {cartList?.map((product) => (
              <ProductListItem
                key={product.productId}
                listStyle="lineStyle"
                isCheckbox={true}
                onChange={changeCheckbox(product.cartId)}
                imageSize="9rem"
                product={product}
              >
                <div>
                  <FlexContainer height="100%" direction="column" justifyContent="space-between" align="flex-end">
                    <Button type="button" onClick={onRemoveProduct(product.cartId)} backgroundColor="transparent">
                      <TrashBin width="1.5rem" color={PALETTE.GRAY_002} />
                    </Button>
                    <QuantityInput quantity={product.quantity} min={1} setQuantity={onChangeQuantity(product.cartId)} />
                    <p>{Number(product.price).toLocaleString()} 원</p>
                  </FlexContainer>
                </div>
              </ProductListItem>
            ))}
          </ProductList>
        </FlexContainer>
        <PriceInfoBox
          width="30%"
          margin="6rem 1.5rem 0 auto"
          title="결제예상금액"
          priceInfo={{ name: '결제예상금액', price: totalPrice }}
          buttonText={'주문하기'}
          onClick={onCheckout}
        />
      </FlexContainer>
    </Main>
  );
};

export default CartPage;
