import styled from '@emotion/styled';
import { FlexWrapper } from 'components/@common/CommonStyle/styles';

const ProductListContainer = styled.div`
  display: grid;
  padding: 3rem;
  grid-template-columns: repeat(auto-fit, 21.25%);
  gap: 0 5%;
`;

const ProductDetailWrapper = styled(FlexWrapper)`
  flex-direction: column;
  margin: 3rem 0;
`;

export { ProductListContainer, ProductDetailWrapper };
