import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Price = styled.span`
  font-size: 1.25rem;
  line-height: 1.6rem;
  color: ${COLOR.BLACK};
`;
