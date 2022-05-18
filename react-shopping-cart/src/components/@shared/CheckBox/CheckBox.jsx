import styled from 'styled-components';

const CheckBox = styled.input`
  appearance: none;
  // FIXME: theme value 사용
  border: 1px solid #2ac1bc;
  border-radius: 2px;
  width: 18px;
  height: 18px;
  cursor: pointer;

  :focus {
    outline: none;
  }
  // FIXME: theme value 사용
  :checked {
    background-color: #2ac1bc;
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

function CheckBox({children}) {
  return <CheckBox type="checkbox">{children}</CheckBox>
}

export default CheckBox;
