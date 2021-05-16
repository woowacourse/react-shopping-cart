import styled from '@emotion/styled';

const ScreenContainer = styled.div`
  background-color: ${({ route }) => (route.includes('/order/') ? 'rgba(229, 229, 229, 0.9)' : 'transparent')};
  min-height: 100vh;
  padding: 60px 20%;

  @media screen and (max-width: 376px) {
    padding: 60px 0;
  }
`;

export default ScreenContainer;
