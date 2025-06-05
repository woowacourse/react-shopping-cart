import styled from '@emotion/styled';

export const Container = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 36px 24px 0;
  gap: 15px;
`;

export const CartList = styled.div`
  overflow: scroll;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  scrollbar-color: transparent transparent;
`;

export const Description = styled.div`
  font-weight: 700;
`;
