import styled, {css} from 'styled-components';

const CheckBoxWrapper = styled.div`
  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: ${({theme}) => `1px solid ${theme.COLOR.DARK_MINT}`};
    border-radius: 2px;

    position: relative;
  }

  ${(props) =>
    css`
        input[id=${props.id}]:checked + label::after {
        content${props.id}        
        color: white;
        font-size: 35px;
        width: 30px;
        height: 30px;
        background-color: ${props.theme.COLOR.DARK_MINT};
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
      }
    `}
`;

export {CheckBoxWrapper};
