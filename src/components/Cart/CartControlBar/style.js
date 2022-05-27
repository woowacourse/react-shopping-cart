import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`;

export const LeftBox = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 12px 20px;
  border: 1px solid ${({ theme }) => theme.COLOR.GREY_100};
  cursor: pointer;
  background-color: ${({ theme }) => theme.COLOR.WHITE};
  font-size: 12px;
`;
