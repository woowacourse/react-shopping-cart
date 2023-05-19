import { styled } from 'styled-components';

export const OrderWrapper = styled.div`
  width: 448px;
  height: 410px;
  border: 1px solid #dddddd;
  margin: 90px auto;
`;

export const OrderTitleContainer = styled.div`
  padding: 22px 0 22px 30px;
  border-bottom: 3px solid #dddddd;

  p {
    font: ${(props) => props.theme.font.subTitle};
  }
`;

export const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 30px 0 0 0;
  padding: 0 30px;

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
  width: 388px;

  button {
    width: 100%;
    height: 73px;
    text-align: center;
    background: ${(props) => props.theme.color.primary};
    color: white;

    &:hover {
      cursor: pointer;
    }
  }
`;
