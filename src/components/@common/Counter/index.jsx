import React from 'react';
import Button from '../Button/styles';
import { Input, FlexWrapper } from '../CommonStyle/styles';

const Counter = ({ count, handleAmount }) => (
  <FlexWrapper>
    <Input
      width="80px"
      height="40px"
      type="number"
      size="1.2rem"
      textAlign="center"
      value={count}
      onChange={(e) => handleAmount(e.target.value)}
    />
    <FlexWrapper flexDirection="column" width="30%" margin="0">
      <Button width="40px" height="20px" margin="0" size="0.5rem">
        ▲
      </Button>
      <Button width="40px" height="20px" margin="0" size="0.5rem">
        ▼
      </Button>
    </FlexWrapper>
  </FlexWrapper>
);

export default Counter;
