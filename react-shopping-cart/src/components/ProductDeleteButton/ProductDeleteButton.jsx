import styled from 'styled-components';

import Button from 'components/@shared/Button/Button';

//TODO: 내부에 가지고 있어야 될듯
//TODO: Button으로 대체
function ProductDeleteButton({ children, ...props }) {
  return <Styled.Root {...props}>{children}</Styled.Root>;
}

const Styled = {
  Root: styled(Button)`
    padding: 8px 14px;
    background-color: ${({ theme }) => theme.colors.cyon_02};
    font-size: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray_02};
  `,
};

export default ProductDeleteButton;
