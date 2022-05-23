import React from 'react';
import styled from 'styled-components';

function CheckBox(props) {
  return <StyledCheckbox {...props} type="checkbox" />;
}

const StyledCheckbox = styled.input`
  appearance: none;
  border: 1px solid #2ac1bc;
  border-radius: 2px;
  min-width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :checked {
    background-color: ${({ theme: { colors } }) => colors.emerald};
  }

  :after {
    content: '✔';
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default CheckBox;
