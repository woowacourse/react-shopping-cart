import styled from 'styled-components';

const Styled = {
  CheckBoxLabel: styled.label`
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #22a6a2;
    height: 25px;
    width: 25px;
    border-radius: 2px;
    box-sizing: border-box;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      border-radius: 2px;
    }

    input:checked ~ .checkmark {
      background-color: #22a6a2;
    }

    .checkmark:after {
      content: '';
      position: absolute;
      display: none;
    }

    input:checked ~ .checkmark:after {
      display: block;
    }

    .checkmark:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  `,
};

export default Styled;
