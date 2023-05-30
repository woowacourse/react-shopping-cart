import styled from 'styled-components';

export const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 68px;
  border-bottom: 2px solid #333333;
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const CartInfoWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1120px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
