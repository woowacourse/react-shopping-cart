import React, { Fragment } from 'react';
import { ReactComponent as TrashCanIcon } from 'assets/trashCanIcon.svg';
import { CartItem, Item } from 'types/domain';
import styled from 'styled-components';
import CroppedImage from 'components/common/CroppedImage';
import { flexCenter } from 'styles/mixin';
import CheckBox from 'components/common/CheckBox';

const CartList = ({ cartList, cartDetail }: { cartList: CartItem[]; cartDetail: Item[] }) => {
  console.log('f', cartList, cartDetail);

  return (
    <StyledRoot>
      <StyledSelectAll>
        <SelectBox>
          <CheckBox id='전체 선택'></CheckBox>
          <p>선택 해제</p>
        </SelectBox>
        <DeleteButton>상품 삭제</DeleteButton>
      </StyledSelectAll>
      <StyledHeader>든든상품배송 {`${cartList.length}`} 개</StyledHeader>
      <StyledList>
        {cartList.map(cartItem => {
          const id = cartItem.id;
          const quantity = cartItem.quantity;
          const detail = cartDetail.filter(item => item.id === id)[0];

          return (
            <StyledListItem key={cartItem.id}>
              <CheckBox id={`${cartItem.id}`}></CheckBox>
              <CroppedImage src={detail.thumbnailUrl} width='150px' height='144px' alt='상품' />
              <StyledItemTitle>{detail.title}</StyledItemTitle>
              <StyledRight>
                <TrashCan></TrashCan>
                <QuantityController>
                  <QuantityPlace>
                    <div>{cartItem.quantity}</div>
                  </QuantityPlace>
                  <IncreaseButton>▲</IncreaseButton>
                  <DecreaseButton>▼</DecreaseButton>
                </QuantityController>
                <TotalPrice>
                  {(cartItem.quantity * detail.price)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  원
                </TotalPrice>
              </StyledRight>
            </StyledListItem>
          );
        })}
      </StyledList>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  grid-area: cl;
  display: inline-block;
  width: 736px;
  height: 724px;
`;

const StyledSelectAll = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
`;

const DeleteButton = styled.button`
  ${flexCenter}
  width: 117px;
  height: 50px;
  border: solid silver 1px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  text-align: center;
`;

const SelectBox = styled.div`
  display: flex;
  font-size: 20px;
  width: 135px;

  justify-content: space-between;
`;

const StyledHeader = styled.p`
  padding: 5px 0px;

  border-bottom: solid silver 4px;
  font-size: 20px;
`;

const StyledList = styled.div`
  width: 736px;
  height: 700px;
  overflow: auto;

  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: inherit;
  }
  &::-webkit-scrollbar-thumb {
    background-color: inherit;
  }
  &::-webkit-scrollbar-track {
    background-color: inherit;
  }
`;

const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  border-bottom: solid silver 1.5px;
  padding: 20px 0;
`;

const StyledItemTitle = styled.div`
  width: 260px;
  padding: 0px 20px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
`;

const StyledRight = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
  align-items: flex-end;
  width: 200px;
`;

const TrashCan = styled(TrashCanIcon)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const QuantityController = styled.div`
  display: grid;
  grid-template-areas:
    ' qp ib'
    'qp db';

  border: solid grey 1px;
`;

const QuantityPlace = styled.div`
  ${flexCenter}

  font-size: 24px;
  grid-area: qp;
  width: 73px;
  height: 60px;
  border: solid grey 1px;
`;

const IncreaseButton = styled.button`
  ${flexCenter}

  grid-area: ib;
  width: 42px;
  height: 30px;
  border: solid grey 1px;
  cursor: pointer;
`;

const DecreaseButton = styled.button`
  ${flexCenter}

  grid-area: db;
  width: 42px;
  height: 30px;
  border: solid grey 1px;
  cursor: pointer;
`;

const TotalPrice = styled.p`
  font-size: 16px;
`;

export default CartList;
