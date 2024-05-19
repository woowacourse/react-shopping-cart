import styled from 'styled-components';

export const ErrorPageContents = styled.div<{ $height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: ${({ $height }) => $height};
`;

export const ErrorPageHeader = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const ErrorPageText = styled.p`
  font-size: 16px;
  margin-bottom: 14px;
`;
