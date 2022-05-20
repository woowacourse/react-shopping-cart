import styled from 'styled-components';

export const Dimmed = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.blackColor_2};
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.whiteColor_1};
  padding: 50px;
  border-radius: 4px;
`;
