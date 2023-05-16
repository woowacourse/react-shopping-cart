import styled from 'styled-components';

import { Heading } from '../../components/common/Heading/Heading.styles';

const CartPageHeading = styled(Heading)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing5};
  text-align: center;
`;

const CartInformationContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 36px;
`;

export { CartPageHeading, CartInformationContainer };
