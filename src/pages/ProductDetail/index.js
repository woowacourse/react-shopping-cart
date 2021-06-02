import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Button } from '../../components/shared';
import Thumbnail from '../../components/shared/Thumbnail';
import { COLOR, FETCH_URL, MESSAGE, PATH } from '../../constants';
import API from '../../request/api';
import useFetch from '../../request/useFetch';
import { addItemToCart } from '../../store/cartReducer';
import { Container, ProductSummary, Price } from './style';

import noProduct from '../../assets/images/no_product.png';

const ProductDetail = () => {
  const { id } = useParams();
  const [item, itemError] = useFetch(FETCH_URL.GET_PRODUCT_DETAIL(id));

  const history = useHistory();
  const dispatch = useDispatch();

  const goMain = () => {
    history.push(PATH.MAIN);
  };

  if (itemError) {
    return (
      <Container>
        <img src={noProduct} alt="상품 상세 없음" />
        <p>존재하지 않는 상품입니다</p>
        <Button type="button" size="medium" backgroundColor={COLOR['GRAY-300']} onClick={goMain}>
          메인으로 돌아가기
        </Button>
      </Container>
    );
  }

  const { image_url: image, name, price, product_id } = item;

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
    <Container>
      <Thumbnail size="x-large" image={image} alt={`${name} 상품 이미지`} />
      <ProductSummary>
        <h2>{name}</h2>
        <Price>
          <p>{`금액`}</p>
          <p>{`${price?.toLocaleString('ko-KR')}원`}</p>
        </Price>
        <Button
          type="button"
          size="medium"
          width="100%"
          backgroundColor={COLOR.BROWN}
          onClick={addCart(product_id)}
        >
          장바구니
        </Button>
      </ProductSummary>
    </Container>
  );
};

export default ProductDetail;
