import React, { ReactElement } from 'react';
import Styled from './QuantityInput.styles';
import { ReactComponent as ArrowUpIcon } from '../../../assets/images/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/images/arrow-down.svg';

interface IProps {
  value: number;
  min: number;
  max: number;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityInput = (props: IProps): ReactElement => {
  const { value, min, max, onChangeInput, onIncrease, onDecrease } = props;

  return (
    <Styled.Root>
      <Styled.Input type="number" value={value} min={min} max={max} onChange={onChangeInput} />
      <Styled.Control>
        <Styled.ArrowWrapper onClick={onIncrease}>
          <ArrowUpIcon />
        </Styled.ArrowWrapper>
        <Styled.ArrowWrapper onClick={onDecrease}>
          <ArrowDownIcon />
        </Styled.ArrowWrapper>
      </Styled.Control>
    </Styled.Root>
  );
};

export default QuantityInput;
