import * as Styled from './NumberInput.styles';
import triangleUpSVG from '../../../assets/svgs/triangle-up.svg';
import triangleDownSVG from '../../../assets/svgs/triangle-down.svg';
import React from 'react';

export interface Props extends Pick<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onIncreaseButtonClick?: () => void;
  onDecreaseButtonClick?: () => void;
}

const NumberInput = ({ value = '1', onChange, onIncreaseButtonClick, onDecreaseButtonClick }: Props) => {
  return (
    <Styled.NumberInput>
      <Styled.Input type="number" value={value} onChange={onChange} />
      <Styled.TriangleButtonWrapper>
        <Styled.TriangleButton onClick={onIncreaseButtonClick}>
          <img src={triangleUpSVG} alt="수량 증가 버튼" />
        </Styled.TriangleButton>
        <Styled.TriangleButton onClick={onDecreaseButtonClick}>
          <img src={triangleDownSVG} alt="수량 감소 버튼" />
        </Styled.TriangleButton>
      </Styled.TriangleButtonWrapper>
    </Styled.NumberInput>
  );
};

export default NumberInput;
