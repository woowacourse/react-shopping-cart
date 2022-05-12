import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CardDetailButton } from 'components/common/Button';
import { flexSpaceBetween } from 'components/common/Styled';

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
      background: #aaaaaa;
    }
  `,
  Price: styled(flexSpaceBetween)`
    font-weight: 400;
    padding: 10px;
    margin-bottom: 20px;
  `,
};

const ProductDetail = () => {
  const { id: productId } = useParams();
  const productList = useSelector(({ productListReducer }) => productListReducer.productList);

  const { name, price, thumbnail } = productList.find(
    (product) => product.id === Number(productId),
  );

  if (!productList.length) {
    return <div>loading</div>;
  }

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
      <CardDetailButton>장바구니</CardDetailButton>
    </Styled.Wrapper>
  );
};

export default ProductDetail;
