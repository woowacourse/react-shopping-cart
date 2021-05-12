import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input, ButtonWrapper, Button, Icon } from './style';
import arrowUp from '../../../assets/icons/arrow-up.svg';
import arrowDown from '../../../assets/icons/arrow-down.svg';

const NumericInput = ({ min = 0, max = 99, value, setValue, step = 1, ariaLabel }) => {
  const onIncrement = () => {
    if (value < max) {
      setValue(Number(value) + step);
    }
  };

  const onDecrement = () => {
    if (value > min) {
      setValue(Number(value) - step);
    }
  };

  const onChange = ({ target }) => {
    if (target.value === '') {
      setValue(target.value);
    }

    if (min <= target.value && target.value <= max) {
      setValue(target.value);
    }
  };

  const onFocusout = ({ target }) => {
    if (target.value === '') {
      setValue(min);
    }
  };

  return (
    <Container>
      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onBlur={onFocusout}
        aria-label={`${ariaLabel} 입력`}
      />
      <ButtonWrapper>
        <Button onClick={onIncrement} aria-label={`${ariaLabel} ${step}개 증가`}>
          <Icon src={arrowUp} alt="증가" />
        </Button>
        <Button onClick={onDecrement}>
          <Icon src={arrowDown} alt="감소" aria-label={`${ariaLabel} ${step}개 감소`} />
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

NumericInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  step: PropTypes.number,
};

export default NumericInput;
