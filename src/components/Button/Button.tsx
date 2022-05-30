import styled from 'styled-components';

const Button = styled.button`
  font-size: 24px;
  width: 100%;
  padding: 16px;
  background: ${({ theme: { colors } }) => colors.emerald};
  color: ${({ theme: { colors } }) => colors.white};

  :disabled {
    pointer-events: none;
    background: ${({ theme: { colors } }) => colors.gray};
  }
`;

export default Button;
