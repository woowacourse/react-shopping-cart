import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProduct } from 'modules/product';
import { COLOR } from 'constants';

import { CardDetailButton, flexSpaceBetween } from 'components/common/Styled';
import LoadingSpinner from 'components/common/Styled/LoadingSpinner';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin: 0 auto;
  `,
  ThumbnailBox: styled.div`
    width: 100%;
    img {
      width: 100%;
    }
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  `,
  Title: styled.p`
    font-weight: 700;
    font-size: 22px;
    padding: 10px;
    position: relative;

    :after {
      content: '';
      position: absolute;
      left: 0px;
      bottom: -8px;
      height: 3px;
      width: 100%;
      background: ${COLOR.PRODUCT_DETAIL_LINE};
    }
  `,
  Price: styled(flexSpaceBetween)`
    font-weight: 400;
    padding: 10px;
    margin-bottom: 20px;
  `,
};

const ProductDetail = ({ onAddCartButtonClick }) => {
  const { id: productId } = useParams();
  const { product, loading, error } = useSelector(({ productReducer }) => productReducer.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch]);

  if (loading || !product) {
    return (
      <Styled.Wrapper>
        <LoadingSpinner />
      </Styled.Wrapper>
    );
  }
  if (error) {
    return <Styled.Wrapper>에러 발생!</Styled.Wrapper>;
  }
  const { name, price, thumbnail } = product;
  return (
    <Styled.Wrapper>
      <Styled.ThumbnailBox>
        <img src={thumbnail} alt="상품상세이미지" />
      </Styled.ThumbnailBox>
      <Styled.Content>
        <Styled.Title>{name}</Styled.Title>
        <Styled.Price>
          <p>금액</p>
          <p>{price}원</p>
        </Styled.Price>
      </Styled.Content>
      <CardDetailButton
        onClick={() => {
          onAddCartButtonClick(Number(productId));
        }}
      >
        장바구니
      </CardDetailButton>
    </Styled.Wrapper>
  );
};

ProductDetail.propTypes = {
  onAddCartButtonClick: PropTypes.func,
};

export default ProductDetail;
