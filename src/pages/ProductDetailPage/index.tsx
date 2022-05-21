import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { CartDetailButton } from 'components/@common/Button';
import Flex from 'components/@common/Flex';
import LoadingSpinner from 'components/@common/LoadingSpinner';

import {
  loadCartProduct,
  loadCartProductList,
  registerCartProduct,
  updateCartProduct,
} from 'api/cart';
import { loadProduct } from 'api/product';
import { setCartProductList, startCartProductList } from 'store/cartProductList/actions';
import { ProductData } from 'types';

const ProductDetail = () => {
  const params = useParams();
  const id = Number(params.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductData | null>(null);

  const handleAddCartButton = async () => {
    try {
      const cartProduct = await loadCartProduct(id);
      if (cartProduct === null) {
        registerCartProduct({ id, thumbnail, name, price, quantity: 1 });
      } else {
        updateCartProduct(id, { ...cartProduct, quantity: cartProduct.quantity + 1 });
      }
      dispatch(startCartProductList());
      loadCartProductList().then((res) => dispatch(setCartProductList(res)));
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    loadProduct(id)
      .then((res) => setProduct(res))
      .catch(() => navigate('/notFound'));
  }, []);

  if (product === null) {
    return <LoadingSpinner />;
  }

  const { name, price, thumbnail } = product;

  return (
    <Styled.Container>
      <Styled.ThumbnailBox>
        <img src={thumbnail} alt="상품 상세 이미지" />
      </Styled.ThumbnailBox>
      <Styled.Content>
        <Styled.Title>{name}</Styled.Title>
        <Styled.Price>
          <Flex justify="space-between">
            <p>금액</p>
            <p>{price.toLocaleString()}원</p>
          </Flex>
        </Styled.Price>
      </Styled.Content>
      <CartDetailButton onClick={handleAddCartButton}>장바구니</CartDetailButton>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
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
  Price: styled.div`
    font-weight: 400;
    padding: 10px;
    margin-bottom: 20px;
  `,
};

export default ProductDetail;
