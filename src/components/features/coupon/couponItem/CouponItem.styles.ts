import styled from '@emotion/styled';

export const Container = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: ${({ disabled }) => (disabled ? '#33333340' : 'black')};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

export const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;
