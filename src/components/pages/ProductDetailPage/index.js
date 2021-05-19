import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_DURATION } from '../../../constants/appInfo';
import { APP_MESSAGE } from '../../../constants/message';
import PALETTE from '../../../constants/palette';
import useSnackbar from '../../../hooks/useSnackbar';
import { addToCart } from '../../../redux/Cart/actions';
import Button from '../../common/Button';
import FlexContainer from '../../common/FlexContainer';
import Snackbar from '../../common/Snackbar';
import Main from '../../Main';
import * as Styled from './style';

const ProductDetailPage = () => {
  const [snackbarMessage, setSnackbarMessage] = useSnackbar(SNACKBAR_DURATION);
  const {
    products: { productList },
    cart,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const hashData = window.location.hash.split('/');
  const productId = hashData[hashData.length - 1];
  const product = productList.find((product) => product.id === productId);

  const onAddToCart = (productId) => () => {
    if (cart.findIndex((product) => product.id === productId) >= 0) return;

    const selectedProduct = productList.find((product) => product.id === productId);
    dispatch(addToCart({ ...selectedProduct, amount: 1, isChecked: false }));

    setSnackbarMessage(`${APP_MESSAGE.PRODUCT_ADDED_TO_CART}`);
  };

  const isAddedToCart = (productId) => {
    return cart.some(({ id }) => productId === id);
  };

  return (
    <Main>
      <FlexContainer direction="column" align="center" justifyContent="center" width="100%" height="100%">
        <Styled.Container>
          {product && (
            <>
              <img src={product.image} alt={`${product.name} image`} />
              <FlexContainer direction="column" justifyContent="center" width="100%">
                <FlexContainer direction="column" justifyContent="center" align="center" width="100%">
                  <Styled.ProductName>{product.name}</Styled.ProductName>
                  <FlexContainer
                    justifyContent="space-between"
                    align="center"
                    width="100%"
                    height="6rem"
                    padding="1rem 1rem 1.5rem 1rem"
                  >
                    <Styled.PriceText>금액</Styled.PriceText>
                    <Styled.ProductPrice>{`${Number(product.price).toLocaleString()} 원`}</Styled.ProductPrice>
                  </FlexContainer>
                </FlexContainer>
                <Button
                  width="100%"
                  height="5rem"
                  fontWeight="600"
                  fontSize="1.5rem"
                  backgroundColor={isAddedToCart(productId) ? PALETTE.GRAY_002 : PALETTE.BROWN}
                  color={PALETTE.WHITE}
                  disabled={isAddedToCart(productId)}
                  cursor={isAddedToCart(productId) ? 'default' : 'pointer'}
                  onClick={onAddToCart(productId)}
                >
                  장바구니
                </Button>
              </FlexContainer>
            </>
          )}
        </Styled.Container>
      </FlexContainer>
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

export default ProductDetailPage;
