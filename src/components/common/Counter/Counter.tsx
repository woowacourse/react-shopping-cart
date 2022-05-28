import { useState } from 'react';
import * as Styled from './Counter.style';
interface CounterPropsType {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}
function Counter({ count, increaseCount, decreaseCount }: CounterPropsType) {
  return (
    <Styled.CounterContainer>
      <Styled.CounterButton onClick={decreaseCount}>-</Styled.CounterButton>
      <Styled.Count>{count}</Styled.Count>
      <Styled.CounterButton onClick={increaseCount}>+</Styled.CounterButton>
    </Styled.CounterContainer>
  );
}

Counter.Input = function InputCounter({
  count,
  increaseCount,
  decreaseCount,
  changeCount,
}: CounterPropsType & {
  changeCount: (count: number) => void;
}) {
  const [{ countValue, isShowInput, isErrorInput }, setCountInput] = useState({
    countValue: count,
    isShowInput: false,
    isErrorInput: false,
  });

  /** error input 인 경우 블러되더라도 input은 사라지지 않는다. 사용자 경험 고려 */
  const onBlur = () => {
    setCountInput(prev => ({
      ...prev,
      isShowInput: isErrorInput ? true : false,
      isErrorInput: false,
    }));
  };

  const onClickCount = () => {
    setCountInput(prev => ({ ...prev, isShowInput: true }));
  };

  const onChangeCountValue = e => {
    const {
      target: { valueAsNumber },
    } = e;

    setCountInput(prev => ({ ...prev, countValue: valueAsNumber }));
  };

  const onSubmitCount = e => {
    e.preventDefault();

    try {
      changeCount(countValue);
    } catch ({ message }) {
      setCountInput(prev => ({ ...prev, isErrorInput: true }));
      alert(message);
    }
  };

  return (
    <Styled.CounterContainer>
      <Styled.CounterButton onClick={decreaseCount}>-</Styled.CounterButton>

      {isShowInput ? (
        <form onSubmit={onSubmitCount}>
          <Styled.InputCount
            type="number"
            value={countValue}
            onChange={onChangeCountValue}
            onBlur={onBlur}
            autoFocus
          />
        </form>
      ) : (
        <Styled.Count onClick={onClickCount}>{count}</Styled.Count>
      )}

      <Styled.CounterButton onClick={increaseCount}>+</Styled.CounterButton>
    </Styled.CounterContainer>
  );
};

export default Counter;
