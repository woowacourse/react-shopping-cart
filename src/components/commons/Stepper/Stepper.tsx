import * as Styled from './Stepper.styled';

interface StepperProps {
  value: number;
  increaseValue: () => void;
  decreaseValue: () => void;
  setValue: (value: number) => void;
}

const Stepper = (props: StepperProps) => {
  const { value, increaseValue, decreaseValue, setValue } = props;

  return (
    <Styled.StepperDiv>
      <Styled.Input
        type="text"
        role="textbox"
        inputMode="numeric"
        value={value}
        onChange={({ target: { value: inputValue } }) => setValue(Number(inputValue))}
        aria-label="상품 개수 입력"
      />
      <Styled.UpButton type="button" onClick={increaseValue} aria-label="상품 1개 추가">
        ▲
      </Styled.UpButton>
      <Styled.DownButton type="button" onClick={decreaseValue} aria-label="상품 1개 삭제">
        ▼
      </Styled.DownButton>
    </Styled.StepperDiv>
  );
};

export default Stepper;
