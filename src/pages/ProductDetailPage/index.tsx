import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { CartDetailButton } from 'components/common/Button';
import Flex from 'components/common/Flex';
import LoadingSpinner from 'components/common/LoadingSpinner';

import { startProduct, setProduct, resetProduct } from 'store/product/actions';
import {
  loadCartProduct,
  loadCartProductList,
  loadProduct,
  registerCartProduct,
  updateCartProduct,
} from 'api';
import { RootState } from 'store';
import { setCartProductList, startCartProductList } from 'store/cartProductList/actions';

const ProductDetail = () => {
  const params = useParams();
  const id = Number(params.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, isLoading } = useSelector((state: RootState) => state.productReducer);

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
    dispatch(startProduct());
    loadProduct(id)
      .then((res) => dispatch(setProduct(res)))
      .catch(() => navigate('/notFound'));

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
          <Flex justify="space-between">
            <p>금액</p>
            <p>{price.toLocaleString()}원</p>
          </Flex>
        </Styled.Price>
      </Styled.Content>
      <CartDetailButton onClick={handleAddCartButton}>장바구니</CartDetailButton>
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
  Price: styled.div`
    font-weight: 400;
    padding: 10px;
    margin-bottom: 20px;
  `,
};

export default ProductDetail;
