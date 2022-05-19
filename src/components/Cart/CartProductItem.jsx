import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DeleteTrashButton } from 'components/common/Styled';
import CountModal from 'components/common/Modal/CountModal';
import CheckBox from 'components/common/Styled/CheckBox';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    width: 736px;
    height: 200px;
    border-bottom: 1px solid #cccccc;
  `,
  ProductInfoBox: styled.div`
    display: flex;
    position: relative;
    width: 100%;

    & > button {
      top: 20px;
      left: 10px;
      position: absolute;
    }
  `,
  Thumbnail: styled.img`
    width: 144px;
    height: 147px;
    margin: 20px 10px 20px 20px;
  `,
  Title: styled.span`
    margin-left: 20px;
    margin-top: 20px;
    font-size: 20px;
  `,
  ProductSelectBox: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 20px;

    & > button {
      position: absolute;
    }
  `,
  CounterBox: styled.div`
    display: flex;
    margin-top: 50px;
  `,
  CounterShowBox: styled.div`
    display: flex;
    width: 60px;
    height: 60px;
    font-size: 24px;
    font-weight: 400;
    justify-content: center;
    padding-top: 15px;
    border: 1px solid #dddddd;
  `,
  UpDownButtonBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  TotalAmount: styled.p`
    margin-top: 20px;
    font-size: 16px;
    font-weight: 400;
  `,
};

const CartProductItem = ({ productInfo, onAddCartButtonClick }) => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/productList/${productInfo.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
      });
  }, []);

  useEffect(() => {
    if (product === null) {
      return;
    }
    setName(product.name);
    setThumbnail(product.thumbnail);
    setPrice(product.price);
  }, [product]);

  return (
    <Styled.Wrapper>
      <Styled.ProductInfoBox>
        <CheckBox id={name} />
        <Styled.Thumbnail src={thumbnail} alt={name} />
        <Styled.Title>{name}</Styled.Title>
      </Styled.ProductInfoBox>
      <Styled.ProductSelectBox>
        <DeleteTrashButton>🗑</DeleteTrashButton>
        <CountModal
          totalCount={productInfo.quantity}
          onClick={onAddCartButtonClick}
          id={productInfo.id}
        />
        <Styled.TotalAmount>{Number(productInfo.quantity) * Number(price)}원</Styled.TotalAmount>
      </Styled.ProductSelectBox>
    </Styled.Wrapper>
  );
};

CartProductItem.propTypes = {
  productInfo: PropTypes.object,
  onAddCartButtonClick: PropTypes.func,
};

export default CartProductItem;
