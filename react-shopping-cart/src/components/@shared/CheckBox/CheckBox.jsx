import styled from 'styled-components';

const CheckBox = styled.input`
  appearance: none;
  border: 1px solid #2ac1bc;
  border-radius: 2px;
  width: 18px;
  height: 18px;
  cursor: pointer;

  :focus {
    outline: none;
  }

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

export default CheckBox;
