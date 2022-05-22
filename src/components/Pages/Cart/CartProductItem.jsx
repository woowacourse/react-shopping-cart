import React from 'react';
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

const CartProductItem = ({
  productInfo,
  onAddCartButtonClick,
  onMinusCartButtonClick,
  onDeleteCartButtonClick,
  onToggleCheckClick,
  isChecked,
}) => {
  return (
    <Styled.Wrapper>
      <Styled.ProductInfoBox>
        <div
          onClick={(e) => {
            e.preventDefault();
            onToggleCheckClick(productInfo.id);
          }}
        >
          <CheckBox id={String(productInfo.id)} isChecked={isChecked} />
        </div>

        <Styled.Thumbnail src={productInfo.thumbnail} alt={productInfo.name} />
        <Styled.Title>{productInfo.name}</Styled.Title>
      </Styled.ProductInfoBox>
      <Styled.ProductSelectBox>
        <DeleteTrashButton
          onClick={() => {
            onDeleteCartButtonClick(Number(productInfo.id));
          }}
        >
          🗑
        </DeleteTrashButton>
        <CountModal
          totalCount={productInfo.quantity}
          onAddCartButtonClick={onAddCartButtonClick}
          onMinusCartButtonClick={onMinusCartButtonClick}
          id={productInfo.id}
        />
        <Styled.TotalAmount>
          {Number(productInfo.quantity) * Number(productInfo.price)}원
        </Styled.TotalAmount>
      </Styled.ProductSelectBox>
    </Styled.Wrapper>
  );
};

CartProductItem.propTypes = {
  productInfo: PropTypes.object,
  onAddCartButtonClick: PropTypes.func,
  onMinusCartButtonClick: PropTypes.func,
  onDeleteCartButtonClick: PropTypes.func,
  onToggleCheckClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default CartProductItem;
