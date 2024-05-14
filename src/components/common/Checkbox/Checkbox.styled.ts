import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  display: flex;
  vertical-align: middle;
  align-items: center;
`;

export const HiddenCheckBox = styled.input.attrs((props) => ({
  type: 'checkbox',
  checked: props.checked,
  onChange: props.onChange,
}))`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const SaveIDCheckBox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: ${(props) => (props.checked ? `black` : `yellow`)};
  opacity: ${(props) => !props.checked && 0.7};
  border-radius: 3px;
  transition: all 100ms;
  margin-right: 8px;

  &:hover {
    opacity: 1;
    background: 'black';
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;
