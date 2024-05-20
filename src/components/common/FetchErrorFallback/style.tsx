import styled from '@emotion/styled';

export const FallbackContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StatusCode = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
`;
