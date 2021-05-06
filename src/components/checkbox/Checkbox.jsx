import React from 'react';
import styled from 'styled-components';

const StyledCheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const StyledIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2.5px;
`;

const StyledHiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 28px;
  height: 28px;
  background-color: ${(props) => (props.isChecked ? '#22A6A2' : 'white')};
  border-radius: 3px;
  border: 1px solid #22a6a2;

  ${StyledIcon} {
    visibility: ${(props) => (props.isChecked ? 'visible' : 'hidden')};
  }
`;

const StyledLabelText = styled.span`
  margin-left: 12px;
`;

const Checkbox = ({ isChecked, children, onChange }) => (
  <label>
    <StyledCheckboxContainer>
      <StyledHiddenCheckbox checked={isChecked} onChange={onChange} />
      <StyledCheckbox isChecked={isChecked}>
        <StyledIcon viewBox="0 0 24 24">
          <polyline points="21 7 10 18 4 12" />
        </StyledIcon>
      </StyledCheckbox>
    </StyledCheckboxContainer>
    {children ? <StyledLabelText>{children}</StyledLabelText> : ''}
  </label>
);

export default Checkbox;
