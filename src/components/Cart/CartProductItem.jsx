import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DeleteButton } from 'components/common/Styled';
import CountModal from 'components/common/Modal/CountModal';

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
  CheckButton: styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid red;
  `,
  CheckInput: styled.input`
    display: none;
    &:checked + label {
      background: #22a6a2;
      & > span {
        display: block;
      }
    }
  `,
  CheckLabel: styled.label`
    width: 28px;
    height: 28px;
    margin-top: 20px;
    border: 1px solid #22a6a2;
    background: transparent;
    color: #fff;
    text-align: center;
    font-size: 22px;

    & > span {
      display: none;
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

const CartProductItem = ({ thumbnail, title, price }) => {
  return (
    <Styled.Wrapper>
      <Styled.ProductInfoBox>
        <Styled.CheckInput type="checkbox" id="product-check" />
        <Styled.CheckLabel for="product-check">
          <span>✔︎</span>
        </Styled.CheckLabel>

        <Styled.Thumbnail src={thumbnail} alt={title} />
        <Styled.Title>샐리 인형</Styled.Title>
      </Styled.ProductInfoBox>
      <Styled.ProductSelectBox>
        <DeleteButton>🗑</DeleteButton>
        <CountModal />
        <Styled.TotalAmount>{price}원</Styled.TotalAmount>
      </Styled.ProductSelectBox>
    </Styled.Wrapper>
  );
};

CartProductItem.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
};

export default CartProductItem;
