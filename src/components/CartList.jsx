import React from 'react';
import styled from 'styled-components';
import { StyledImageWrapper, StyledImg } from './common';
import CheckBox from './common/CheckBox';

import Counter from './common/Counter';
import DeleteIconButton from './common/DeleteIconButton';
import PriceBox from './common/PriceBox';

function CartList({ products }) {
  return (
    <StyledCartListLayout>
      <StyledCartListOptionWrapper>
        <CheckBox labelText={'선택해제'} />
        <StyledDeleteButton>상품 삭제</StyledDeleteButton>
      </StyledCartListOptionWrapper>
      <StyledCartListWrapper>
        <StyledCartListTitle>
          <span>든든배송 상품(3개)</span>
        </StyledCartListTitle>
        <StyledCartList>
          {products.map((product) => {
            return <CartListItem key={product.id} product={product} />;
          })}
        </StyledCartList>
      </StyledCartListWrapper>
    </StyledCartListLayout>
  );
}

const CartListItem = ({ product }) => {
  const { id, name, price, imageUrl } = product;

  const handleRemoveItem = () => {
    console.log('delete click');
  };

  return (
    <StyledCartListItem>
      <StyledItemInfoWrapper>
        <div>
          <CheckBox />
        </div>
        <StyledItemInfo>
          <StyledImageWrapper>
            <StyledImg src={imageUrl}></StyledImg>
          </StyledImageWrapper>
          <span>{name}</span>
        </StyledItemInfo>
      </StyledItemInfoWrapper>
      <StyledItemControlBox>
        <DeleteIconButton onClickCallback={handleRemoveItem} />
        <Counter />
        <PriceBox price={price} />
      </StyledItemControlBox>
    </StyledCartListItem>
  );
};

const StyledDeleteButton = styled.button`
  width: 117px;
  height: 50px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid #bbbbbb;
  border-radius: 0px;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #333333;
  &:hover {
    background: ${({ theme }) => theme.COLORS.PRIMARY};
    color: ${({ theme }) => theme.COLORS.WHITE};
    cursor: pointer;
  }
`;

const StyledCartListLayout = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
`;

const StyledCartListOptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0;
`;

const StyledCartListWrapper = styled.div`
  width: 100%;
`;

const StyledCartListTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333333;
  padding: 8px 0;
`;

const StyledCartList = styled.div``;
const StyledCartListItem = styled.div`
  border-top: 1.5px solid #cccccc;
  &:nth-child(1) {
    border-top: 4px solid #aaaaaa;
  }
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
`;

const StyledItemInfo = styled.div`
  display: flex;
  gap: 16px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const StyledItemInfoWrapper = styled.div`
  display: flex;
`;

const StyledItemControlBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export default CartList;
