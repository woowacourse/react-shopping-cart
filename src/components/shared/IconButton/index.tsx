import { VFC } from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface Props {
  image: string;
  width: string;
  height: string;
}

const IconButton = styled(Button)<Props>`
  background-image: url(${({ image }) => image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export default IconButton;
