import styled from 'styled-components';

interface CounterProps {
  quantity: number;
  handleQuantityChange: (quantity: number, prevQuantity: number) => void;
}

export const Counter = ({ quantity, handleQuantityChange }: CounterProps) => {
  const handleIncrease = () => {
    const increasedQuantity = quantity + 1;

    if (increasedQuantity > 999) return handleQuantityChange(999, quantity);
    handleQuantityChange(increasedQuantity, quantity);
  };

  const handleDecrease = () => {
    handleQuantityChange(quantity - 1, quantity);
  };

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputCount = Number(e.target.value);

    if (inputCount <= 0) return handleQuantityChange(1, quantity);
    if (inputCount > 999) return handleQuantityChange(999, quantity);

    handleQuantityChange(inputCount, quantity);
  };

  return (
    <Style.Container>
      <Style.Button onClick={handleDecrease}>➖</Style.Button>
      <Style.Input
        value={quantity}
        onChange={handleChangeInput}
        type="number"
      />
      <Style.Button onClick={handleIncrease}>➕</Style.Button>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    width: 75px;
    height: 28px;

    display: flex;
    flex-wrap: nowrap;

    border: 1px solid lightgray;
  `,
  Input: styled.input`
    width: 23px;

    text-align: center;

    flex: 1;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      padding: 0;
    }
  `,
  Button: styled.button`
    all: unset;

    font-size: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;
    cursor: pointer;
  `,
};
