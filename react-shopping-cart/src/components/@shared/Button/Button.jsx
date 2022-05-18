import styled from 'styled-components';

const Button = styled.button`
  border: none;
  // FIXME: theme value 사용
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(1.15);
  }
`;

export default Button;
