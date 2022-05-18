import styled from '@emotion/styled';
import { FlexWrapper } from 'components/@common/CommonStyle/styles';
import { COLORS } from 'styles/theme';

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

const CartListContainer = styled(FlexWrapper)`
  flex-direction: column;
  padding: 3rem;
`;

const CartListReceiptContainer = styled(FlexWrapper)`
  margin: 5.3rem 2rem;
  border: 1px solid ${COLORS.GRAY_300};
`;

export { ProductListContainer, ProductDetailWrapper, CartListContainer, CartListReceiptContainer };
