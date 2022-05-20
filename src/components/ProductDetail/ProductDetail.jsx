import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropType from 'prop-types';
import { BasicButton, BasicImage } from '../shared/basics';
import { COLOR } from '../../constants/styles';

import useDeleteProductFromCart from '../../hooks/useDeleteProductFromCart';
import useStoreProduct from '../../hooks/useStoreProduct';
import { addProductToCarts, deleteProductFromCarts } from '../../store/carts';
import usePropDefaultState from '../../hooks/usePropDefaultState';

function ProductDetail({ id, src, title, price, isStored }) {
  const dispatch = useDispatch();
  const timeout = useRef();
  const [isClicked, setIsClicked] = usePropDefaultState(isStored);
  const { isCartAddLoading, addToCart, cartAddError } = useStoreProduct(id);
  const { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError } =
    useDeleteProductFromCart(id);

  const isLoading = isCartAddLoading || isCartDeleteLoading;
  const buttonText = isClicked ? '장바구니 취소' : '장바구니 담기';
  const isError = deleteProductFromCartError || cartAddError;

  const handleCartButtonClick = () => {
    if (isError) {
      return;
    }

    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      if (isClicked) {
        deleteFromCart();
        dispatch(deleteProductFromCarts(id));
      } else {
        addToCart();
        dispatch(addProductToCarts(id));
      }

      setIsClicked((prev) => !prev);
    }, 500);
  };

  return (
    <Style.ProductDetailBox>
      <Style.ProductDetailImage size="large" src={src} alt={title} />
      <Style.ProductDetailInfo>
        <Style.ProductDetailTitle>{title}</Style.ProductDetailTitle>
        <Style.DivideLine />
        <Style.ProductDetailPriceWrapper>
          <span>금액</span>
          <Style.ProductDetailPrice>{`${price}원`}</Style.ProductDetailPrice>
        </Style.ProductDetailPriceWrapper>
      </Style.ProductDetailInfo>
      <Style.ProductDetailCartButton onClick={handleCartButtonClick}>
        {isLoading ? '전송 중' : buttonText}
        {isError && ' 에러가 발생했습니다.'}
      </Style.ProductDetailCartButton>
    </Style.ProductDetailBox>
  );
}

ProductDetail.propTypes = {
  id: PropType.string.isRequired,
  src: PropType.string.isRequired,
  title: PropType.string.isRequired,
  price: PropType.string.isRequired,
  isStored: PropType.bool.isRequired,
};

export default ProductDetail;

const Style = {
  ProductDetailContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 50px;
  `,
  ProductDetailBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 520px;
  `,
  ProductDetailImage: styled(BasicImage)`
    margin-bottom: 10px;
  `,
  ProductDetailInfo: styled.div`
    width: 100%;
  `,
  ProductDetailTitle: styled.span`
    font-size: 24px;
  `,
  ProductDetailPriceWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ProductDetailPrice: styled.span`
    font-size: 24px;
  `,
  ProductDetailCartButton: styled(BasicButton)`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    padding: 24px;
    background: ${COLOR.PRIMARY};
    border-bottom: 6px solid ${COLOR.DARK_BROWN};
    font-size: 24px;
    color: white;
    border-radius: 4px;

    &:active {
      margin-top: 25px;
      border-bottom-width: 0px;
    }
  `,
  DivideLine: styled.hr`
    width: 100%;
    margin: 20px 0;
    border: 2px solid #aaaaaa;
  `,
};
