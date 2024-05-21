import styled from 'styled-components';

export const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const NotificationContainer = styled.div`
  display: flex;
  width: 90%;
  align-items: start;
  column-gap: 3px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  p {
    padding-top: 2px;
  }
`;
