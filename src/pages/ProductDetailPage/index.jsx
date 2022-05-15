import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { CardDetailButton } from 'components/common/Button';
import { FlexSpaceBetween } from 'components/common/Flex';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { setProduct, resetProduct } from 'modules/product';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const { currentProduct, isLoading } = useSelector(({ productReducer }) => productReducer);

  useEffect(() => {
    const loadProduct = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/productList/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();
      dispatch(setProduct(result));
    };

    loadProduct();

    return () => {
      dispatch(resetProduct());
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { name, price, thumbnail } = currentProduct;

  return (
    <Styled.Wrapper>
      <Styled.ThumbnailBox>
        <img src={thumbnail} alt="상품 상세 이미지" />
      </Styled.ThumbnailBox>
      <Styled.Content>
        <Styled.Title>{name}</Styled.Title>
        <Styled.Price>
          <p>금액</p>
          <p>{price.toLocaleString()}원</p>
        </Styled.Price>
      </Styled.Content>
      <CardDetailButton>장바구니</CardDetailButton>
    </Styled.Wrapper>
  );
};

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
      width: 100%;
      height: 2px;

      position: absolute;
      left: 0px;
      bottom: -8px;

      background: ${({ theme }) => theme.colors.gray};
    }
  `,
  Price: styled(FlexSpaceBetween)`
    font-weight: 400;
    padding: 10px;
    margin-bottom: 20px;
  `,
};

export default ProductDetail;
