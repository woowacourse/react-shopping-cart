import styled from 'styled-components';
import { Theme } from '../../types';

type Props = {
  color?: 'black' | 'gray';
  thickness?: 'thin' | 'think';
  theme: Theme;
};

const DivideLine = styled.hr<Props>`
  width: 100%;

  border-style: solid;
  border-color: ${({ color, theme: { colors } }) =>
    color === 'gray' ? colors.gray : colors.black};
  border-width: ${({ thickness }) => (thickness === 'thin' ? '1px' : '2px')};
`;

export default DivideLine;
