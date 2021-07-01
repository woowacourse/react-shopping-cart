import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Spinner from '../../components/common/Icon/Spinner';
import Loader from '../../components/common/Loader';
import ErrorModal from '../../components/common/Modal/ErrorModal';
import Pagination from '../../components/common/Pagination';
import Main from '../../components/Main';
import Product from '../../components/shared/Product';

import { PAGES, PRODUCTS_PER_PAGE, UNIT } from '../../constants/appInfo';
import PALETTE from '../../constants/palette';
import useErrorModal from '../../hooks/useErrorModal';
import usePagination from '../../hooks/usePagination';

import { getCart } from '../../redux/Cart/actions';
import { getProducts, resetProducts } from '../../redux/Products/actions';

import * as Styled from './style';

const ProductListPage = () => {
  const {
    products: { productList, isLoading: isProductLoading },
  } = useSelector((state) => state);
  const {
    pageStartIndex,
    onPagePrevious,
    onPageNext,
    onPageSelected,
    isPreviousPageAvailable,
    isNextPageAvailable,
    currentPage,
  } = usePagination(0, productList.length, PRODUCTS_PER_PAGE);
  const { errorMessage, openModal, closeModal } = useErrorModal();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(getProducts()), dispatch(getCart())]).catch((error) => {
      openModal(error.message);
    });

    return () => {
      dispatch(resetProducts());
    };
  }, []);

  const onProductDetail = (product) => () => {
    history.push(`${PAGES.PRODUCT_DETAIL.ADDRESS}/${product.productId}`);
  };

  return (
    <Main>
      <Loader animationType={'spin'} isLoading={isProductLoading}>
        <Spinner width={'8rem'} color={PALETTE.BAEMINT} />
      </Loader>
      <Styled.ProductList>
        {productList.slice(pageStartIndex, pageStartIndex + PRODUCTS_PER_PAGE).map((product) => (
          <li key={product.productId}>
            <Product
              product={product}
              productDetail={{
                text: `${product.price.toLocaleString()} ${UNIT.MONEY}`,
                fontSize: '1.5rem',
              }}
              direction="column"
              size="17.5rem"
              onClick={onProductDetail(product)}
            />
            <Styled.ShoppingCartButton product={product} />
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
      <ErrorModal errorMessage={errorMessage} closeModal={closeModal} />
    </Main>
  );
};

export default React.memo(ProductListPage);
