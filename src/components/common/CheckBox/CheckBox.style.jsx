import styled from 'styled-components';

export const Container = styled.div``;

export const CustomCheckBox = styled.div`
  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colorConfig.primary};
  border-radius: 3px;

  background-color: ${({ checked, theme }) => checked && theme.colorConfig.primary};
  cursor: pointer;
`;
