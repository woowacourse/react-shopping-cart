import styled from 'styled-components';

//재사용O
function Button({ children, ...props }) {
  return <Styled.Root {...props}>{children}</Styled.Root>;
}

const Styled = {
  Root: styled.button`
    border: none;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    :hover {
      filter: brightness(1.15);
    }
  `,
};

export default Button;
