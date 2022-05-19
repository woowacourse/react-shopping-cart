import styled from 'styled-components';

import Button from 'components/@shared/Button/Button';

//TODO: 여기도 컴포넌트를 Button으로 대체하자
function ShoppingCartButton({ children, ...props }) {
  return <Styled.Root {...props}>{children}</Styled.Root>;
}

const Styled = {
  Root: styled(Button)`
    width: 425px;
    height: 65px;
    font-size: 21px;
    background-color: ${({ $isincart, theme }) =>
      $isincart ? theme.colors.red_01 : theme.colors.brown_09};
  `,
};

export default ShoppingCartButton;
