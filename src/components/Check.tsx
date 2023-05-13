import React from 'react';
import styled from 'styled-components';

function Check() {
  return <StyledCheck>checkComponent</StyledCheck>;
}

const StyledCheck = styled.div`
  border: 1px solid yellow;
  font-size: 32px;
`;

export default Check;
