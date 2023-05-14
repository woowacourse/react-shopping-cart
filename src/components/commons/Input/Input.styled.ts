import styled from 'styled-components';

export const StyledInput = styled.input`
  border: 1px solid #dddddd;
  text-align: center;

  width: ${props => props.width};
  height: ${props => props.height};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;
