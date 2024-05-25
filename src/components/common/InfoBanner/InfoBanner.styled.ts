import styled from 'styled-components';

export const InfoText = styled.span`
  color: rgba(10, 13, 19, 1);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

export const InfoBanner = styled.div<{ $padding?: string }>`
  padding: ${({ $padding }) => $padding || '52px 0px 12px 0px'};
  display: flex;
  align-items: center;
  gap: 4px;
`;
