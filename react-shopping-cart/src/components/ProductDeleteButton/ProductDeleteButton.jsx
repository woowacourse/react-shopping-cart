import styled from 'styled-components';

import Button from 'components/@shared/Button/Button';

const ProductDeleteButton = styled(Button)`
  padding: 8px 14px;
  background-color: white;
  font-size: 12px;
  // FIXME: theme color 적용
  color: black;
  border: 1px solid ${({ theme }) => theme.colors['gray_02']};
`;

export default ProductDeleteButton;
