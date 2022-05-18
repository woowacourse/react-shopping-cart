import { ButtonHTMLAttributes, ReactNode } from 'react';
import theme from 'styles/theme';
import styled from 'styled-components';

type Size = 'large' | 'medium' | 'small';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Size;
  backgroundColor: keyof typeof theme.colors;
  children: ReactNode;
}

const Button = ({ size, backgroundColor, children, ...props }: ButtonProps) => {
  return (
    <StyledButton size={size} backgroundColor={backgroundColor} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ size: Size; backgroundColor: keyof typeof theme.colors }>`
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
  color: white;
  ${({ size }) => {
    switch (size) {
      case 'large':
        return `
          width: 638px; 
          height: 98px;
          font-size: 3.2rem;
        `;
      case 'medium':
        return `
          width: 388px; 
          height: 73px;
          font-size: 2.4rem;
        `;
      case 'small':
        return `
          width: 13.8rem; 
          height: 4.7rem;
          font-size: 2.0rem;
        `;
    }
  }};
`;
