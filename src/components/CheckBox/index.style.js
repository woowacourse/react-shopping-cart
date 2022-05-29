import styled from 'styled-components';

const Styled = {
  Container: styled.label`
    display: block;
    height: 25px;
    width: 25px;
    border-radius: 2px;
    position: relative;
    border: 1px solid ${({ theme }) => theme.colors.mint_002};
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
      background-color: ${({ theme }) => theme.colors.mint_002};
    }

    &:after {
      content: '';
      position: absolute;
      left: 8px;
      top: 4px;
      width: 5px;
      height: 10px;
      border: solid ${({ theme }) => theme.colors.white};
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  `,
};

export default Styled;
