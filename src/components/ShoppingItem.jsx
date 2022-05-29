import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledCheckbox } from './common/Styled';
import { BsTrash } from 'react-icons/bs';
import { COLORS } from '../styles/theme';
import { MESSAGE } from '../constants';
import useCart from '../hooks/useCart';

function ShoppingItem({ item, isCheckedAll, handleSelectedItem, removeSelectedItem }) {
  const { deleteItem, updateItemQuantity } = useCart();
  const [isChecked, setChecked] = useState(isCheckedAll);
  const { id, name, price, imageUrl, quantity } = item;

  const incrementQuantity = () => {
    updateItemQuantity(id, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity === 1) return;
    updateItemQuantity(id, quantity - 1);
  };

  const toggleChecked = () => {
    handleSelectedItem(id);
    setChecked(!isChecked);
  };

  const onClickDeleteIcon = () => {
    if (window.confirm(MESSAGE.CHECK_DELETE)) {
      deleteItem(id);
      removeSelectedItem(id);
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
        <BsTrash className="logo" onClick={onClickDeleteIcon} />
        <StyledAmountContainer>
          <span>{quantity}</span>
          <div>
            <button onClick={incrementQuantity}>▲</button>
            <button onClick={decrementQuantity}>▼</button>
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

  span {
    width: 66px;
    height: 55px;
    border: 1px solid ${COLORS.LIGHT_GRAY};
    text-align: center;
    line-height: 55px;
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
