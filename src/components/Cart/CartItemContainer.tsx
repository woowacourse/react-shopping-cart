import { ReactComponent as DeleteIcon } from 'assets/deleteIcon.svg';
import CheckBox from 'components/common/CheckBox';
import CroppedImage from 'components/common/CroppedImage';
import styled from 'styled-components';
import { ItemInCart } from 'types/domain';

import QuantityBox from './QuantityBox';

interface CartItemContainerProps {
  item: ItemInCart;
  selectItem: () => void;
  changeQuantity: () => void;
  deleteItem: () => void;
}

const CartItemContainer = ({
  item,
  selectItem,
  changeQuantity,
  deleteItem,
}: CartItemContainerProps) => {
  const { thumbnailUrl, price, title, isSelected, quantity } = item;

  const handleClickDeleteButton = () => {
    if (window.confirm(`<${title}> 상품을 삭제하시겠습니까?`)) {
      deleteItem();
    }
  };

  return (
    <StyledCartItem>
      <CheckBox checked={isSelected} onChange={selectItem} />
      <CroppedImage src={thumbnailUrl} width='144px' height='144px' alt={title} />
      <p>{title}</p>
      <StyledRight>
        <StyledDeleteIcon onClick={handleClickDeleteButton} />
        <QuantityBox quantity={quantity} handleChange={changeQuantity} />
        <p>{price.toLocaleString()}원</p>
      </StyledRight>
    </StyledCartItem>
  );
};

export default CartItemContainer;

const StyledCartItem = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.GRAY_500};
  width: 100%;
  height: 181px;

  & > p {
    font-size: 20px;
    flex: 1;
  }

  & > :nth-of-type(1) {
    margin-left: 10px;
  }
  & > :nth-of-type(2) {
    margin-left: 15px;
  }
`;

const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  & > p {
    font-size: 16px;
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
`;
