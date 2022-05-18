import styled from 'styled-components';

import Button from 'components/@shared/Button/Button';

const ProductDeleteButton = styled(Button)`
  padding: 8px 14px;
  background-color: ${({ theme }) => theme.colors.cyon_02};
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray_02};
`;

export default ProductDeleteButton;
