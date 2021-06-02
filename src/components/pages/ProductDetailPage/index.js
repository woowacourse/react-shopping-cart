import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_DURATION } from '../../../constants/appInfo';
import { APP_MESSAGE } from '../../../constants/message';
import PALETTE from '../../../constants/palette';
import useSnackbar from '../../../hooks/useSnackbar';
import { addToCart } from '../../../redux/Cart/actions';
import { getProduct, resetProduct } from '../../../redux/ProductDetail/actions';
import Button from '../../common/Button';
import FlexContainer from '../../common/FlexContainer';
import Spinner from '../../common/Icon/Spinner';
import Loader from '../../common/Loader';
import Snackbar from '../../common/Snackbar';
import Main from '../../Main';
import * as Styled from './style';

const ProductDetailPage = () => {
  const [snackbarMessage, setSnackbarMessage] = useSnackbar(SNACKBAR_DURATION);
  const {
    productDetail: { product, isLoading },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const hashData = window.location.hash.split('/');
    const productId = Number(hashData[hashData.length - 1]);
    dispatch(getProduct(productId));

    return () => {
      dispatch(resetProduct());
    };
  }, []);

  const onAddToCart = (productId) => () => {
    dispatch(addToCart(productId));
    setSnackbarMessage(`${APP_MESSAGE.PRODUCT_ADDED_TO_CART}`); // TODO: 장바구니 추가에 성공하면 띄우기(ContextAPI 고려)
  };

  return (
    <Main>
      <Loader animationType={'spin'} isLoading={isLoading}>
        <Spinner width={'8rem'} color={PALETTE.BAEMINT} />
      </Loader>
      <FlexContainer direction="column" align="center" justifyContent="center" width="100%" height="100%">
        <Styled.Container>
          {product && (
            <>
              <img src={product.image_url} alt={`${product.name} image`} />
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
                    <Styled.ProductPrice>{`${product.price.toLocaleString()} 원`}</Styled.ProductPrice>
                  </FlexContainer>
                </FlexContainer>
                <Button
                  width="100%"
                  height="5rem"
                  fontWeight="600"
                  fontSize="1.5rem"
                  backgroundColor={PALETTE.BROWN}
                  color={PALETTE.WHITE}
                  cursor={'pointer'}
                  onClick={onAddToCart(product.product_id)}
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
