import styled from 'styled-components';

export default styled.input.attrs({ type: 'checkbox' })`
  display: none;

  + label {
    cursor: pointer;
    position: relative;
    width: 28px;
    height: 28px;
    border: 1px solid ${({ theme }) => theme.green2};
    border-radius: 2px;
  }

  &:checked + label::after {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    content: '✔';
    font-size: 25px;
    text-align: center;
    background-color: ${({ theme }) => theme.green2};
  }
`;
