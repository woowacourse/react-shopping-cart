import { useRef } from 'react';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

interface QuantityBoxProps {
  quantity: number;
  handleChange: (diff?: number) => void;
}

const QuantityBox = ({ quantity, handleChange }: QuantityBoxProps) => {
  const inputRef = useRef(null);

  return (
    <StyledRoot>
      {/* @TODO: number 제한 */}
      <StyledInput type='number' defaultValue={quantity} ref={inputRef} />
      <div>
        <StyledArrowBox
          onClick={() => {
            inputRef.current.value = quantity + 1;
            handleChange(1);
          }}
        >
          <StyledArrowUp />
        </StyledArrowBox>
        <StyledArrowBox
          onClick={() => {
            inputRef.current.value = quantity - 1;
            handleChange(-1);
          }}
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
  color: ${({ theme }) => theme.colors.GRAY_500};
`;

const StyledInput = styled.input`
  width: 7.3rem;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  text-align: center;
  font-size: 24px;
`;

const StyledArrowBox = styled.div`
  width: 4.2rem;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  ${flexCenter}
  cursor: pointer;
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
