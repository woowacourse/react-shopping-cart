import { styled } from 'styled-components';

export const OrderWrapper = styled.div`
  width: 360px;
  height: 360px;
  border: 1px solid #dddddd;
  margin: 60px auto;
  background: ${(props) => props.theme.color.white};
`;

export const OrderTitleContainer = styled.div`
  padding: 16px 0 16px 24px;
  border-bottom: 3px solid #dddddd;

  p {
    font: ${(props) => props.theme.font.subTitle};
  }
`;

export const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 24px 0 0 0;
  padding: 0 24px;

  div {
    display: flex;
    justify-content: space-between;

    p {
      font: ${(props) => props.theme.font.emphasizeFont};
    }

    &:last-child {
      margin-top: 15px;
    }
  }
`;

export const OrderButtonContainer = styled.div`
  margin: 40px auto 0 auto;
  width: 80%;

  button {
    width: 100%;
    height: 60px;
    text-align: center;
    background: ${(props) => props.theme.color.primary};
    color: white;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      opacity: 0.7;
    }
  }
`;
