import { useAppDispatch } from 'hooks/useAppDispatch';
import { useRef } from 'react';
import { CartListAction } from 'redux/cartList/action';
import { putCartItemRequest } from 'redux/cartList/thunk';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import { ItemInCart } from 'types/domain';
import { debounce } from 'utils/debounce';

interface QuantityBoxProps {
  item: ItemInCart;
}

const QuantityBox = ({ item }: QuantityBoxProps) => {
  const { quantity } = item;
  const dispatch = useAppDispatch<CartListAction>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeInput = debounce(() => {
    const diff = inputRef.current.valueAsNumber
      ? inputRef.current.valueAsNumber - quantity
      : 1 - quantity;

    dispatch(putCartItemRequest({ ...item, quantity: quantity + diff }));
  }, 300);

  return (
    <StyledRoot>
      {/* @TODO: number 제한 */}
      <StyledInput
        type='number'
        defaultValue={quantity}
        ref={inputRef}
        onChange={handleChangeInput}
      />
      <div>
        <StyledArrowBox
          onClick={() => {
            inputRef.current.valueAsNumber = quantity + 1;
            dispatch(putCartItemRequest({ ...item, quantity: quantity + 1 }));
          }}
        >
          <StyledArrowUp />
        </StyledArrowBox>
        <StyledArrowBox
          onClick={() => {
            inputRef.current.valueAsNumber = quantity - 1;
            dispatch(putCartItemRequest({ ...item, quantity: quantity - 1 }));
          }}
          disabled={quantity <= 1}
        >
          <StyledArrowDown />
        </StyledArrowBox>
        <div></div>
      </div>
    </StyledRoot>
  );
};

export default QuantityBox;

const StyledRoot = styled.div`
  display: flex;
  height: 6rem;
  color: ${({ theme }) => theme.colors.GRAY_333};
`;

const StyledInput = styled.input`
  width: 7.3rem;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_ddd};
  text-align: center;
  font-size: 24px;
`;

const StyledArrowBox = styled.button`
  width: 4.2rem;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_ddd};
  ${flexCenter}
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.GRAY_ddd};
  }
`;

const StyledArrowUp = styled.div`
  width: 0px;
  height: 0px;
  border-bottom: 8px solid #666666;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
`;

const StyledArrowDown = styled(StyledArrowUp)`
  transform: rotate(180deg);
`;
