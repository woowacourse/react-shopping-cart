import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import { PAGES, SNACKBAR_DURATION } from '../../constants/appInfo';
import { APP_MESSAGE } from '../../constants/message';
import PALETTE from '../../constants/palette';

import useSnackbar from '../../hooks/useSnackbar';
import {
  toggleAllCheckboxesInCart,
  changeQuantity,
  removeCheckedProducts,
  removeProduct,
  getCart,
} from '../../redux/Cart/actions';

import * as Styled from './style';
import useCartCheckbox from '../../hooks/useCartCheckbox';

const CartPage = () => {
  const [isAllChecked, setIsAllChecked, changeCheckbox, changeAllCheckbox] = useCartCheckbox();
  const [snackbarMessage, setSnackbarMessage] = useSnackbar(SNACKBAR_DURATION);
  const {
    cart: { cartList, isLoading },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const totalPrice = cartList?.reduce(
    (sum, product) => (sum += product.isChecked ? product.price * product.quantity : 0),
    0
  );

  const onRemoveCheckedProducts = () => {
    const checkedCartIds = cartList.filter((product) => product.isChecked).map((product) => product.cart_id);
    dispatch(removeCheckedProducts(checkedCartIds));

    setSnackbarMessage(APP_MESSAGE.CART_PRODUCT_REMOVED);
  };

  const onRemoveProduct = (cartId) => () => {
    dispatch(removeProduct(cartId));

    setSnackbarMessage(APP_MESSAGE.CART_PRODUCT_REMOVED);
  };

  const onChangeQuantity = (cartId) => (quantity) => {
    dispatch(changeQuantity(cartId, quantity));
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

  useEffect(() => {
    // dispatch(getCart());
    const isProductExists = !!cartList.length;
    dispatch(toggleAllCheckboxesInCart(isProductExists));
    setIsAllChecked(isProductExists);
  }, []);

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
                key={product.product_id}
                listStyle="lineStyle"
                isCheckbox={true}
                onChange={changeCheckbox(product.cart_id)}
                imageSize="9rem"
                product={product}
              >
                <div>
                  <FlexContainer height="100%" direction="column" justifyContent="space-between" align="flex-end">
                    <Button type="button" onClick={onRemoveProduct(product.cart_id)} backgroundColor="transparent">
                      <TrashBin width="1.5rem" color={PALETTE.GRAY_002} />
                    </Button>
                    <QuantityInput
                      quantity={product.quantity}
                      min={1}
                      setQuantity={onChangeQuantity(product.cart_id)}
                    />
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
