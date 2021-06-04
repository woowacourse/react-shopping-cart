import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useFetch from '../../hooks/useFetch';
import API from '../../request/api';
import { addItemToCart } from '../../store/cartReducer';
import { FETCH_URL, MESSAGE, PATH } from '../../constants';
import { Grid, Card, IconButton } from '../../components/shared';

import { Description, Price } from './style';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';

const ProductList = () => {
  const [list, productListError] = useFetch(FETCH_URL.GET_PRODUCTS);
  const history = useHistory();
  const dispatch = useDispatch();

  if (productListError) {
    return <>상품을 불러올 수 없습니다. 다시 시도해주세요😭</>;
  }

  const goDetailPage = id => () => {
    history.push(`${PATH.GOODS_DETAIL}/${id}`);
  };

  const addCart = id => async () => {
    try {
      const newCartItem = await API.addItemToCart(id);

      dispatch(addItemToCart(newCartItem));
      alert(MESSAGE.SUCCESS_ADD_ITEM_TO_CART);
    } catch (error) {
      console.error(error.message);
      alert(MESSAGE.FAIL_ADD_ITEM_TO_CART);
    }
  };

  return (
    <Grid col="4">
      {Object.values(list).map(({ product_id: id, name, image_url: image, price }) => {
        return (
          <Card
            key={id}
            title={name}
            thumbnail={{ image: image, alt: name }}
            onClick={goDetailPage(id)}
            description={
              <Description>
                <Price>{price.toLocaleString('ko-KR')} 원</Price>
                <IconButton
                  size="medium"
                  ariaLabel={`${name}을 장바구니에 담기`}
                  onClick={addCart(id)}
                >
                  <CartIcon />
                </IconButton>
              </Description>
            }
          />
        );
      })}
    </Grid>
  );
};

export default ProductList;
