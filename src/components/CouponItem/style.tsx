import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 318px;
  height: 82px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.divider};
`;

export const Container = styled.div<{ disabled: boolean }>`
  padding: 12px 0;

  opacity: ${({ disabled }) => (disabled ? '25%' : 1)};
`;

export const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 12px;
`;

export const Description = styled.label`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const Information = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;
