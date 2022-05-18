import React from 'react';
import styled from 'styled-components';
import { StyledCheckbox } from './common/Styled';
import { BsTrash } from 'react-icons/bs';
import { COLORS } from '../styles/theme';

function Product() {
  return (
    <StyledContainer>
      <StyledProductLeft>
        <StyledCheckbox name="checkbox" type="checkbox" />
        <img src="./assets/images/product.png" alt="" />
        <span>PET보틀-정사각(420ml)</span>
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
        <StyledPrice>123,456원</StyledPrice>
      </StyledProductRight>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const StyledProductLeft = styled.div`
  display: flex;
  margin-top: 10px;
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

export default Product;
