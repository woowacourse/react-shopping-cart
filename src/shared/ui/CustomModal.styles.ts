import styled from '@emotion/styled';

type ModalPosition = 'center' | 'bottom';

export const Overlay = styled.div<{ position: ModalPosition }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: ${({ position }) => (position === 'center' ? 'center' : 'flex-end')};
`;

export const ModalContainer = styled.div<{ position: ModalPosition }>`
  background-color: white;
  padding: 24px 16px;
  animation: slideUp 0.3s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  ${({ position }) =>
    position === 'bottom'
      ? `
    width: 100%;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  `
      : `
    width: 95%;
    min-width: 480px;
    border-radius: 16px;
  `}

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ModalContent = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
