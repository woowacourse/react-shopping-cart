import React from 'react';
import styled from 'styled-components';
import Check from '@/components/Check';

function App() {
  return (
    <StyledAppTest>
      <Check />
    </StyledAppTest>
  );
}

const StyledAppTest = styled.div`
  font-size: 20px;
`;

export default App;
