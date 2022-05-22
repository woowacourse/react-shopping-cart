import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { StyledCheckbox } from './common/Styled';
import { BsTrash } from 'react-icons/bs';
import { COLORS } from '../styles/theme';
import { deleteCartItemAsync } from '../store/cart/cart.actions';

function ShoppingItem({ item, isCheckedAll, handleSelectedItem }) {
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(isCheckedAll);
  const { id, name, price, imageUrl } = item;

  const toggleChecked = () => {
    handleSelectedItem(id);
    setChecked(!isChecked);
  };

  const deleteItem = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      dispatch(deleteCartItemAsync(id));
    }
  };

  useEffect(() => {
    setChecked(isCheckedAll);
  }, [isCheckedAll]);

  return (
    <StyledContainer>
      <StyledProductLeft>
        <StyledCheckbox
          name="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={toggleChecked}
        />
        <img src={imageUrl} alt={name} />
        <span>{name}</span>
      </StyledProductLeft>
      <StyledProductRight>
        <BsTrash className="logo" onClick={deleteItem} />
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
