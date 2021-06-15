import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UNIT } from '../../../constants/appInfo';
import useSnackbar from '../../../hooks/useSnackbar';
import { addToCart } from '../../../redux/Cart/actions';
import { resetErrorMessage } from '../../../redux/Message/actions';
import { getProducts, resetProducts } from '../../../redux/Products/actions';
import Modal from '../../common/Modal';
import Snackbar from '../../common/Snackbar';
import Main from '../../Main';
import Product from '../../shared/Product';
import * as Styled from './style';

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
            />
            <Styled.ShoppingCartButton product={product} />
          </li>
        ))}
      </Styled.ProductList>
      {errorMessage && <Modal onClose={onCloseErrorMessageModal}>{errorMessage}</Modal>}
      {snackbarMessage && <Snackbar message={snackbarMessage} duration={SNACKBAR_DURATION} />}
    </Main>
  );
};

export default React.memo(ProductListPage);
