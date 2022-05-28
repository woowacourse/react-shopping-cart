import React from 'react';
import BlackText from 'components/BlackText';
import MessageWrapperStyled from './style';

function StateMessage({ message }) {
  return (
    <MessageWrapperStyled>
      <BlackText fontSize="30px" fontWeight="800">
        {message}
      </BlackText>
    </MessageWrapperStyled>
  );
}

export default StateMessage;
