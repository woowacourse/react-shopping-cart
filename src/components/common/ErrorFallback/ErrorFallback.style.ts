import styled from '@emotion/styled';

export const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const ErrorTitle = styled.h3`
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const ErrorDescription = styled.p`
  font-size: 15px;
  font-weight: 400;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  font-size: 13px;
  font-weight: 400;
  padding: 8px;
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  background: #f0f0f0;
  white-space: break-spaces;
  text-align: center;
`;

export const RefreshButton = styled.button`
  background: #000000;
  padding: 8px 16px;
  border-radius: 5px;
  margin-top: 16px;

  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #222222;
  }
`;
