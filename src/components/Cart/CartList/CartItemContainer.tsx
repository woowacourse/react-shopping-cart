import { ReactComponent as DeleteIcon } from 'assets/deleteIcon.svg';
import CheckBox from 'components/common/CheckBox';
import CroppedImage from 'components/common/CroppedImage';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { CartListAction } from 'redux/cartList/action';
import {
  deleteCartItemRequest,
  patchCartSelectedRequest,
  putCartItemRequest,
} from 'redux/cartList/thunk';
import styled from 'styled-components';
import { ItemInCart } from 'types/domain';

import QuantityBox from '../QuantityBox';

interface CartItemContainerProps {
  item: ItemInCart;
}

const CartItemContainer = ({ item }: CartItemContainerProps) => {
  const dispatch = useAppDispatch<CartListAction>();
  const { id, thumbnailUrl, price, title, isSelected } = item;

  const handleClickDeleteButton = () => {
    if (window.confirm(`<${title}> 상품을 삭제하시겠습니까?`)) {
      dispatch(deleteCartItemRequest(Number(id)));
    }
  };

  return (
    <StyledCartItem>
      <CheckBox
        checked={isSelected}
        onChange={() => dispatch(patchCartSelectedRequest(Number(id)))}
      />
      <CroppedImage src={thumbnailUrl} width='144px' height='144px' alt={title} />
      <p>{title}</p>
      <StyledRight>
        <StyledDeleteIcon onClick={handleClickDeleteButton} />
        <QuantityBox item={item} />
        <p>{price.toLocaleString()}원</p>
      </StyledRight>
    </StyledCartItem>
  );
};

export default CartItemContainer;

const StyledCartItem = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.GRAY_333};
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
