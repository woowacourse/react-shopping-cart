import styled from 'styled-components';
import { GapType } from './SelectButtonContainer';

export const SelectButtonContainer = styled.div<{ $gap: GapType }>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.$gap === 'narrow'
      ? 'gap: 0.5rem'
      : 'justify-content: space-between;'};
`;
