import { useState, ChangeEvent } from 'react';

import * as Styled from './NumberInput.styles';
import triangleUpSVG from '../../../assets/svgs/triangle-up.svg';
import triangleDownSVG from '../../../assets/svgs/triangle-down.svg';
import { isNumber } from '../../../utils/validation';

export interface Props {
  initValue: number;
  maxLength?: number;
}

const NumberInput = ({ initValue = 1, maxLength = 2 }: Props) => {
  const [number, setNumber] = useState<number>(initValue);

  const onNumberChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!isNumber(target.value)) {
      return;
    }

    setNumber(target.valueAsNumber);
  };

  return (
    <Styled.NumberInput>
      <Styled.Input maxLength={maxLength} value={number} onChange={onNumberChange} />
      <Styled.TriangleButtonWrapper>
        <Styled.TriangleButton>
          <img src={triangleUpSVG} />
        </Styled.TriangleButton>
        <Styled.TriangleButton>
          <img src={triangleDownSVG} />
        </Styled.TriangleButton>
      </Styled.TriangleButtonWrapper>
    </Styled.NumberInput>
  );
};

export default NumberInput;
