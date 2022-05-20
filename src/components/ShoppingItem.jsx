import React from 'react';
import styled from 'styled-components';
import { StyledCheckbox } from './common/Styled';
import { BsTrash } from 'react-icons/bs';
import { COLORS } from '../styles/theme';

function ShoppingItem({ item }) {
  const { name, price, imageUrl } = item;

  return (
    <StyledContainer>
      <StyledProductLeft>
        <StyledCheckbox name="checkbox" type="checkbox" checked="true" />
        <img src={imageUrl} alt="" />
        <span>{name}</span>
      </StyledProductLeft>
      <StyledProductRight>
        <BsTrash className="logo" />
        <StyledAmountContainer>
          <input type="number" value="1" readOnly />
          <div>
            <button>▲</button>
            <button>▼</button>
          </div>
        </StyledAmountContainer>
        <StyledPrice>{Number(price).toLocaleString()} 원</StyledPrice>
      </StyledProductRight>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 28px 0;
`;

const StyledProductLeft = styled.div`
  display: flex;
  gap: 15px;

  img {
    width: 144px;
    height: 144px;
  }

  span {
    font-size: 20px;
  }
`;

const StyledProductRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: end;
  gap: 20px;

  .logo {
    align-self: flex-end;
    font-size: 20px;
    cursor: pointer;
  }
`;

const StyledAmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 66px;
    height: 53px;
    border: 1px solid ${COLORS.LIGHT_GRAY};
    text-align: center;
    font-size: 24px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    border: 1px solid ${COLORS.LIGHT_GRAY};
    font-size: 100%;
    cursor: pointer;
  }
`;

const StyledPrice = styled.span`
  align-self: flex-end;
`;

export default ShoppingItem;
