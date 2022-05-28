import styled from 'styled-components';
import { Theme } from '../../types';

type Props = {
  variant?: string;
  theme: Theme;
};

const DivideLine = styled.hr<Props>`
  width: 100%;

  border: ${({ variant, theme: { colors } }) => {
    if (variant === 'gray') return `2px solid ${colors.gray}`;

    if (variant === 'thin') return `1px solid ${colors.gray}`;

    return '2px solid black';
  }};
`;

export default DivideLine;
