import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Title = styled.h2`
  flex: 0 0 128px;
  padding: 58px 0 29px 0;
  border-bottom: 4px solid #333333;
  font-weight: 700;
  font-size: 24px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  color: #333333;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding-top: 34px;
  gap: 100px;

  @media screen and (max-width: 1439px) {
    flex-direction: column;
    align-items: center;
  }
`;
