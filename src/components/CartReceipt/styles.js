import styled from '@emotion/styled';
import { FlexWrapper } from 'components/@common/CommonStyle/styles';
import { COLORS } from 'styles/theme';

const CartListReceiptContainer = styled(FlexWrapper)`
  width: 60%;
  flex-direction: column;
  align-items: flex-start;
  margin: 5.3rem 2rem;
  border: 1px solid ${COLORS.GRAY_300};
`;

export { CartListReceiptContainer };
