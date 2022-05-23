import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 재사용O
function NavigateButton({ to = '#', children, ...props }) {
  return (
    <Styled.Root to={to} {...props}>
      {children}
    </Styled.Root>
  );
}

const Styled = {
  Root: styled(Link)`
    font-weight: 500;
    font-size: 16px;
    line-height: 12px;
    text-decoration: none;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    :hover {
      filter: brightness(90%);
    }
  `,
};

export default NavigateButton;
