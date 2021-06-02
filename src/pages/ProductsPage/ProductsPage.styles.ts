import styled from '@emotion/styled';
import { SpinnerWrapper } from 'components/shared/commonStyles';

const Root = styled.section`
  margin: 60px 0;
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 40px;
  row-gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
  justify-content: center;

  @media ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(2, 282px);
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(1, 282px);
  }
`;

export default {
  Root,
  ProductList,
  SpinnerWrapper,
};
