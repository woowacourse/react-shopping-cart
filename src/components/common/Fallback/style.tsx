import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacer.spacing5};
`;

export const Message = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`;
