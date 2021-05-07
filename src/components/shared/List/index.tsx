import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

const List = styled.ul`
  border-top: 4px solid ${PALETTE.GRAY[600]};

  & > * {
    border-bottom: 1.5px solid ${PALETTE.GRAY[400]};
  }

  & > *:last-child {
    border-bottom: none;
  }
`;

export default List;

// export const InnerTitle = styled.h3`
//   font-size: 1.125rem;
//   margin-bottom: 1.25rem;
// `;
