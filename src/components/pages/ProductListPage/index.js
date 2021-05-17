import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_DURATION, UNIT, PRODUCTS_PER_PAGE } from '../../../constants/appInfo';
import { APP_MESSAGE } from '../../../constants/message';
import PALETTE from '../../../constants/palette';
import useSnackbar from '../../../hooks/useSnackbar';
import usePagination from '../../../hooks/usePagination';
import { addToCart } from '../../../redux/Cart/actions';
import { resetErrorMessage } from '../../../redux/Message/actions';
import { getProducts, resetProducts } from '../../../redux/Products/actions';
import Button from '../../common/Button';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Modal from '../../common/Modal';
import Snackbar from '../../common/Snackbar';
import Main from '../../Main';
import Product from '../../shared/Product';
import * as Styled from './style';
import Pagination from '../../common/Pagination';

const ProductListPage = () => {
  const [snackbarMessage, setSnackbarMessage] = useSnackbar(SNACKBAR_DURATION);
  const { products, cart, errorMessage } = useSelector((state) => state);
  const {
    pageStartIndex,
    onPagePrevious,
    onPageNext,
    onPageSelected,
    isPreviousPageAvailable,
    isNextPageAvailable,
    currentPage,
  } = usePagination(0, products.length);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());

    return () => {
      dispatch(resetProducts());
    };
  }, []);

  useEffect(() => {
    console.log(pageStartIndex);
  }, [pageStartIndex]);

  const onAddToCart = (productId) => () => {
    if (cart.findIndex((product) => product.id === productId) >= 0) return;

    const selectedProduct = products.find((product) => product.id === productId);
    dispatch(addToCart({ ...selectedProduct, amount: 1, isChecked: true }));

    setSnackbarMessage(`${APP_MESSAGE.PRODUCT_ADDED_TO_CART}`);
  };

  const onCloseErrorMessageModal = () => {
    dispatch(resetErrorMessage());
  };

  return (
    <Main>
      <Styled.ProductList>
        {products.slice(pageStartIndex, pageStartIndex + PRODUCTS_PER_PAGE).map((product) => (
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
      <Pagination
        pages={products.length}
        onPagePrevious={onPagePrevious}
        onPageNext={onPageNext}
        onPageSelected={onPageSelected}
        isPreviousPageAvailable={isPreviousPageAvailable}
        isNextPageAvailable={isNextPageAvailable}
        currentPage={currentPage}
      />
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
