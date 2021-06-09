import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../common/Button';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Spinner from '../../common/Icon/Spinner';
import Loader from '../../common/Loader';
import ErrorModal from '../../common/Modal/ErrorModal';
import Pagination from '../../common/Pagination';
import Snackbar from '../../common/Snackbar';
import Main from '../../Main';
import Product from '../../shared/Product';

import { PAGES, PRODUCTS_PER_PAGE, SNACKBAR_DURATION, UNIT } from '../../../constants/appInfo';
import { APP_MESSAGE } from '../../../constants/message';
import PALETTE from '../../../constants/palette';

import usePagination from '../../../hooks/usePagination';
import useSnackbar from '../../../hooks/useSnackbar';
import { addToCart, getCart, resetCart } from '../../../redux/Cart/actions';
import { resetErrorMessage } from '../../../redux/Message/actions';
import { getProducts, resetProducts } from '../../../redux/Products/actions';

import * as Styled from './style';

const ProductListPage = () => {
  const [snackbarMessage, setSnackbarMessage] = useSnackbar(SNACKBAR_DURATION);
  const {
    products: { productList, isLoading: isProductLoading },
    cart: { cartList, isLoading: isCartLoading },
    errorMessage,
  } = useSelector((state) => state);
  const {
    pageStartIndex,
    onPagePrevious,
    onPageNext,
    onPageSelected,
    isPreviousPageAvailable,
    isNextPageAvailable,
    currentPage,
  } = usePagination(0, productList.length);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());

    return () => {
      dispatch(resetProducts());
      dispatch(resetCart());
    };
  }, []);

  const onAddToCart = (productId) => () => {
    const targetProduct = productList.find((product) => product.product_id === productId);
    dispatch(addToCart(targetProduct));

    setSnackbarMessage(`${APP_MESSAGE.PRODUCT_ADDED_TO_CART}`); // TODO: 장바구니 추가에 성공하면 띄우기
  };

  const onCloseErrorMessageModal = () => {
    dispatch(resetErrorMessage());
  };

  const onProductDetail = (product) => () => {
    window.location.hash = `#${PAGES.PRODUCT_DETAIL.ADDRESS}/${product.product_id}`;
  };

  return (
    <Main>
      <Loader animationType={'spin'} isLoading={isProductLoading && isCartLoading}>
        <Spinner width={'8rem'} color={PALETTE.BAEMINT} />
      </Loader>
      <Styled.ProductList>
        {productList.slice(pageStartIndex, pageStartIndex + PRODUCTS_PER_PAGE).map((product) => (
          <li key={product.product_id}>
            <Product
              product={product}
              productDetail={{
                text: `${product.price.toLocaleString()} ${UNIT.MONEY}`,
                fontSize: '1.5rem',
              }}
              direction="column"
              size="17.5rem"
              onClick={onProductDetail(product)}
            >
              {!cartList.some(({ product_id }) => product.product_id === product_id) ? (
                <Button hoverAnimation="scale" backgroundColor="transparent" onClick={onAddToCart(product.product_id)}>
                  <ShoppingCart width="2rem" color={PALETTE.BLACK} />
                </Button>
              ) : (
                <Button backgroundColor="transparent" disabled={true} cursor="default">
                  <ShoppingCart width="2rem" color={PALETTE.WHITE} />
                </Button>
              )}
            </Product>
          </li>
        ))}
      </Styled.ProductList>
      {!!productList.length && (
        <Pagination
          pages={productList.length}
          onPagePrevious={onPagePrevious}
          onPageNext={onPageNext}
          onPageSelected={onPageSelected}
          isPreviousPageAvailable={isPreviousPageAvailable}
          isNextPageAvailable={isNextPageAvailable}
          currentPage={currentPage}
        />
      )}
      {errorMessage && <ErrorModal onClose={onCloseErrorMessageModal} textContent={errorMessage} />}
      {snackbarMessage && (
        <Snackbar
          key={Math.random()}
          message={snackbarMessage}
          ms={SNACKBAR_DURATION}
          backgroundColor={PALETTE.GRAY_008}
        />
      )}
    </Main>
  );
};

export default React.memo(ProductListPage);
