import React from 'react';

import Button from 'styles/Button';

import Wrapper from './style';

const PayAmount = ({ title, amount, buttonText }) => {
  return (
    <Wrapper>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="amount">
        <div className="flex-row-space-between">
          <p>{title}</p>
          <p>{amount.toLocaleString()}원</p>
        </div>
        <Button>{buttonText}</Button>
      </div>
    </Wrapper>
  );
};

export default PayAmount;
