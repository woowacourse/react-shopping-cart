import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MESSAGE, PATH } from '../../constants';
import { Grid, Card, IconButton, Loader } from '../../components/shared';
import { Description, Price } from './style';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { FAILURE, LOADING, SUCCESS } from '../../constants/status';
import notFoundImage from '../../assets/images/not-found-product.png';
import { useCart } from '../../hooks/useCart';
import { getProductsThunk } from '../../modules/product';

const ProductList = () => {
  const { data: productList, status } = useSelector(state => state.product.products);
  const { cartStatus, addCartItem } = useCart();

  const history = useHistory();
  const dispatch = useDispatch();

  const goDetailPage = id => {
    history.push(`${PATH.PRODUCTS}/${id}`);
  };

  const onAddCartItem = item => {
    addCartItem(item);
    if (cartStatus === SUCCESS) {
      alert(MESSAGE.SUCCESS_ADD_ITEM_TO_CART);
    }
  };

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  if (status === LOADING) {
    return <Loader />;
  }

  if (status === FAILURE) {
    return <>{MESSAGE.FAIL_FETCH_DATA}</>;
  }

  if (productList) {
    return (
      <Grid col="4">
        {productList.map(({ productId, name, imageUrl, price }) => (
          <Card
            key={productId}
            title={name}
            thumbnail={{ imageUrl, notFoundImage, alt: name }}
            onClick={() => {
              goDetailPage(productId);
            }}
            description={
              <Description>
                <Price>{price.toLocaleString('ko-KR')} 원</Price>
                <IconButton
                  size="medium"
                  ariaLabel={`${name}을 장바구니에 담기`}
                  onClick={() => {
                    onAddCartItem({ productId, name, imageUrl, price });
                  }}
                >
                  <CartIcon />
                </IconButton>
              </Description>
            }
          />
        ))}
      </Grid>
    );
  }
};

export default ProductList;
