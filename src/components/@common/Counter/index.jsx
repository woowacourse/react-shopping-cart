import React from 'react';
import Button from '../Button/styles';
import { Input, FlexWrapper } from '../CommonStyle/styles';

const Counter = ({ id, count, handleItemCount }) => {
  const onClickButton = (amount) => {
    const totalAmount = count + amount;
    if (totalAmount > 99 || totalAmount < 1) {
      return;
    }

    handleItemCount(id, totalAmount);
  };

  const onInputCounter = (e) => {
    const inputNumber = Number(e.target.value);

    if (inputNumber > 99 || inputNumber < 1) {
      return;
    }

    handleItemCount(id, Number(e.target.value));
  };

  return (
    <FlexWrapper>
      <Input
        width="80px"
        height="40px"
        type="number"
        size="1.2rem"
        textAlign="center"
        value={count}
        onChange={(e) => onInputCounter(e)}
      />
      <FlexWrapper flexDirection="column" width="30%" margin="0">
        <Button
          onClick={() => onClickButton(1)}
          width="40px"
          height="20px"
          margin="0"
          size="0.5rem"
        >
          ▲
        </Button>
        <Button
          onClick={() => onClickButton(-1)}
          width="40px"
          height="20px"
          margin="0"
          size="0.5rem"
        >
          ▼
        </Button>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default Counter;
