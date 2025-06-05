import styled from '@emotion/styled';

export const CheckboxWrapper = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: ${(props) => (props.checked ? '#000' : '#fff')};
  color: ${(props) => (props.checked ? '#fff' : 'rgba(0, 0, 0, 0.1)')};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
`;
