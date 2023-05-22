import React from "react";
import styled from "styled-components";

interface CounterProps extends React.HTMLProps<HTMLInputElement> {
  value: string;
  setValue: (newValue: string) => void;
  lowerBound?: number;
}

const Counter = (props: CounterProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement) || e.key !== "Enter") return;
    e.target.blur();
  };

  const handleUpArrowBox = () => {
    props.setValue((Number(props.value) + 1).toString());
  };

  const handleDownArrowBox = () => {
    props.setValue((Number(props.value) - 1).toString());
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.lowerBound !== undefined && Number(e.target.value) < props.lowerBound) {
      props.setValue(props.lowerBound.toString());
      return;
    }

    props.onBlur && props.onBlur(e);
  };

  return (
    <Wrapper>
      <CountInput
        type="number"
        value={props.value}
        onChange={props.onChange}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        placeholder={props.placeholder}
      />
      <ArrowBoxContainer>
        <ArrowBox onClick={handleUpArrowBox}>▾</ArrowBox>
        <ArrowBox
          onClick={handleDownArrowBox}
          disabled={props.lowerBound !== undefined && Number(props.value) <= props.lowerBound}
        >
          ▾
        </ArrowBox>
      </ArrowBoxContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const CountInput = styled.input`
  width: 41px;
  height: 28px;

  border: 1px solid #dddddd;
  text-align: center;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    font-size: 11px;
  }
`;

const ArrowBoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  :active {
    opacity: 50%;
  }

  & > :first-child {
    transform: scaleY(-1);
  }
`;

const ArrowBox = styled.button`
  width: 23px;
  height: 14px;

  border: 1px solid #dddddd;
  background: transparent;

  font-size: 5px;
`;

export default Counter;
