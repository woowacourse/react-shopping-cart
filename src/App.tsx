import React from 'react';
import styled from 'styled-components';

function App() {
  return <StyledAppTest>hi</StyledAppTest>;
}

const StyledAppTest = styled.div`
  border: 1px solid red;
  font-size: 20px;
  background: green;
`;

export default App;
