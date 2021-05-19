import styled from 'styled-components';

const IconSize = {
  small: '24px',
  medium: '48px',
};

export const Container = styled.button`
  width: ${({ size }) => IconSize[size]};
  height: ${({ size }) => IconSize[size]};
  border-radius: 4px;
  background: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
  padding: 0.25rem 0 0;
  text-align: center;
  transform: translateY(-30%);

  &:hover {
    background: #f5f5f5;
  }

  & svg {
    width: 70%;
  }
`;
