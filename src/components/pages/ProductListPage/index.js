import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCTS_PER_PAGE, SNACKBAR_DURATION, UNIT } from '../../../constants/appInfo';
import { APP_MESSAGE } from '../../../constants/message';
import PALETTE from '../../../constants/palette';
import usePagination from '../../../hooks/usePagination';
import useSnackbar from '../../../hooks/useSnackbar';
import { addToCart } from '../../../redux/Cart/actions';
import { resetErrorMessage } from '../../../redux/Message/actions';
import { getProducts, resetProducts } from '../../../redux/Products/actions';
import Button from '../../common/Button';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Spinner from '../../common/Icon/Spinner';
import Loader from '../../common/Loader';
import Modal from '../../common/Modal';
import Pagination from '../../common/Pagination';
import Snackbar from '../../common/Snackbar';
import Main from '../../Main';
import Product from '../../shared/Product';
import * as Styled from './style';

const ProductListPage = () => {
  const [snackbarMessage, setSnackbarMessage] = useSnackbar(SNACKBAR_DURATION);
  const {
    products: { productList, isLoading },
    cart,
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

    return () => {
      dispatch(resetProducts());
    };
  }, []);

  const onAddToCart = (productId) => () => {
    if (cart.findIndex((product) => product.id === productId) >= 0) return;

    const selectedProduct = productList.find((product) => product.id === productId);
    dispatch(addToCart({ ...selectedProduct, amount: 1, isChecked: false }));

    setSnackbarMessage(`${APP_MESSAGE.PRODUCT_ADDED_TO_CART}`);
  };

  const onCloseErrorMessageModal = () => {
    dispatch(resetErrorMessage());
  };

  return (
    <Main>
      <Loader animationType={'spin'} isLoading={isLoading}>
        <Spinner width={'8rem'} color={PALETTE.BAEMINT} />
      </Loader>
      <Styled.ProductList>
        {productList.slice(pageStartIndex, pageStartIndex + PRODUCTS_PER_PAGE).map((product) => (
          <li key={product.id}>
            <Product
              product={product}
              productDetail={{
                text: `${Number(product.price).toLocaleString()} ${UNIT.MONEY}`,
                fontSize: '1.5rem',
              }}
              direction="column"
              size="17.5rem"
            >
              {!cart.some(({ id }) => product.id === id) ? (
                <Button hoverAnimation="scale" backgroundColor="transparent" onClick={onAddToCart(product.id)}>
                  <ShoppingCart width="2rem" color={PALETTE.BLACK} />
                </Button>
              ) : (
                <Button backgroundColor="transparent" disabled="disabled" cursor="default">
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
      {errorMessage && <Modal onClose={onCloseErrorMessageModal}>{errorMessage}</Modal>}
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
