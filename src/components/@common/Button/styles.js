import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: 70px;
  border: none;
  margin: 2rem 0;
  background-color: ${(props) => props.backgroundColor || COLORS.BROWN_100};
  color: ${(props) => props.color || COLORS.WHITE};
  font-weight: bold;
  font-size: 1.16rem;

  &:hover {
    background-color: ${(props) => props.hoverColor || COLORS.BROWN_50};
  }
`;

export default Button;
