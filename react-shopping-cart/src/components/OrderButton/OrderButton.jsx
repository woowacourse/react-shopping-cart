import styled from 'styled-components';

import Button from 'components/@shared/Button/Button';

function OrderButton({ children }) {
  return <Styled.Root>{children}</Styled.Root>;
}

const Styled = {
  Root: styled(Button)`
    width: 258px;
    height: 48px;
    font-size: 16px;
    background: ${({ theme }) => theme.colors.cyon_02};
  `,
};

export default OrderButton;
