import styled from '@emotion/styled';
import Button from '../Button/Button';

const ButtonContainer = styled(Button)`
  margin: 10px 5px;
  width: 30px;
  position: absolute;
  right: 3px;
  top: 3px;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    background: none;
  }

  svg {
    display: block;
    pointer-events: none;

    path {
      stroke: gray;
      fill: transparent;
      stroke-linecap: round;
      stroke-width: 2;
      pointer-events: none;
    }
  }
`;

export { ButtonContainer };
