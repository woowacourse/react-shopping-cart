import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2.5px;
`;

const CheckboxShapeDiv = styled.div`
  display: inline-block;
  width: 28px;
  height: 28px;
  background-color: ${({ isChecked }) => (isChecked ? '#22A6A2' : 'white')};
  border-radius: 3px;
  border: 1px solid #22a6a2;

  ${CheckIcon} {
    visibility: ${({ isChecked }) => (isChecked ? 'visible' : 'hidden')};
  }
`;

const HiddenCheckboxInput = styled.input.attrs({ type: 'checkbox' })`
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

const Text = styled.span`
  margin-left: 12px;
`;

const Checkbox = ({ isChecked, children, onChange }) => {
  return (
    <label>
      <Content>
        <HiddenCheckboxInput checked={isChecked} onChange={onChange} />
        <CheckboxShapeDiv isChecked={isChecked}>
          <CheckIcon viewBox="0 0 24 24">
            <polyline points="21 7 10 18 4 12" />
          </CheckIcon>
        </CheckboxShapeDiv>
      </Content>
      {children ? <Text>{children}</Text> : ''}
    </label>
  );
};

export default Checkbox;
