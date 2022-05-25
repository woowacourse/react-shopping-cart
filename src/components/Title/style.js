import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.FONT.PRIMARY};
`;

export const Line = styled.hr`
  width: 100%;
  border-color: ${({ theme }) => theme.COLOR.BLACK};
  margin-top: 15px;
`;
