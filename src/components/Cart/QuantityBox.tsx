import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

interface QuantityBoxProps {
  quantity: number;
}

const QuantityBox = ({ quantity }: QuantityBoxProps) => {
  return (
    <StyledRoot>
      {/* @TODO: number 제한 */}
      <StyledInput type='number' value={quantity} />
      <div>
        <StyledArrowBox>
          <StyledArrowUp />
        </StyledArrowBox>
        <StyledArrowBox>
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
  color: ${({ theme }) => theme.colors.font};
`;

const StyledInput = styled.input`
  width: 7.3rem;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.boxBorder};
  text-align: center;
  font-size: 24px;
`;

const StyledArrowBox = styled.div`
  width: 4.2rem;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.boxBorder};
  ${flexCenter}
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
