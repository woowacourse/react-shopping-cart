import styled from '@emotion/styled';

export const PreviousPageButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    animation: bounce 0.2s cubic-bezier(0, 0, 0.18, 0.99) 2 alternate;
  }

  @keyframes bounce {
    to {
      transform: translateX(-5px);
    }
  }
`;
