import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UNIT } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';
import { addToCart } from '../../../redux/Cart/actions';
import { getProducts, resetProducts } from '../../../redux/Products/actions';
import { resetErrorMessage } from '../../../redux/Message/actions';
import Button from '../../common/Button';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Modal from '../../common/Modal';
import Main from '../../Main';
import Product from '../../shared/Product';
import * as Styled from './style';
import useSnackbar from '../../../hooks/useSnackbar';
import Snackbar from '../../common/Snackbar';

const SNACKBAR_DURATION = 4000;

const ProductListPage = () => {
  const { products, cart, errorMessage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useSnackbar(SNACKBAR_DURATION);

  useEffect(() => {
    dispatch(getProducts());

    return () => {
      dispatch(resetProducts());
    };
  }, []);

  const onAddToCart = ({ target }) => {
    const selectedProductId = target.closest('li[data-product-id]').dataset.productId;

    if (cart.findIndex((product) => product.id === selectedProductId) >= 0) return;

    const selectedProduct = products.find((product) => product.id === selectedProductId);
    dispatch(addToCart({ ...selectedProduct, amount: 1, isChecked: false }));

    setSnackbarMessage('장바구니에 상품을 추가했습니다');
  };

  const onCloseErrorMessageModal = () => {
    dispatch(resetErrorMessage());
  };

  return (
    <Main>
      <Styled.ProductList>
        {products.map((product) => (
          <li data-product-id={product.id} key={product.id}>
            <Product
              product={product}
              productDetail={{
                text: `${Number(product.price).toLocaleString()} ${UNIT.MONEY}`,
                fontSize: '1.5rem',
              }}
              direction="column"
              size="17.5rem"
            >
              {!cart.some(({ id }) => product.id === id) && (
                <Button hoverAnimation={'scale'} backgroundColor="transparent" onClick={onAddToCart}>
                  <ShoppingCart width="2rem" color={PALETTE.BLACK} />
                </Button>
              )}
            </Product>
          </li>
        ))}
      </Styled.ProductList>
      {errorMessage && <Modal onClose={onCloseErrorMessageModal}>{errorMessage}</Modal>}
      {snackbarMessage && <Snackbar key={Date.now()} message={snackbarMessage} duration={SNACKBAR_DURATION} />}
    </Main>
  );
};

export default React.memo(ProductListPage);
