import styled from '@emotion/styled';

export const Container = styled.li<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-top: 1px solid #e0e0e0;
  gap: 12px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  * {
    color: ${({ $disabled }) => ($disabled ? '#0A0D13' : '#000')};
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Text = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;
