import styled from 'styled-components';

const Styled = {
  Container: styled.label`
    height: 25px;
    width: 25px;
    border-radius: 2px;
    position: relative;
    border: 1px solid #22a6a2;
    box-sizing: border-box;
    cursor: pointer;

    input {
      display: none;
    }
  `,

  CheckMark: styled.span`
    position: absolute;
    height: 25px;
    width: 25px;
    border-radius: 2px;

    input:checked ~ & {
      background-color: #22a6a2;
    }

    &:after {
      content: '';
      position: absolute;
      left: 8px;
      top: 4px;
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
