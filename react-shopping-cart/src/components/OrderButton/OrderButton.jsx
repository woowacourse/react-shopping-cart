import styled from 'styled-components';

import Button from 'components/@shared/Button/Button';

//TODO: Button 컴포넌트를 그냥 사용하고 이 컴포넌트를 없애도 될듯

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
