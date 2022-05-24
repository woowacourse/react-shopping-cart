import styled from 'styled-components';

const Styled = {
  Wrapper: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 50px;
  `,

  ContentsWrapper: styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  `,

  PaymentBoxWrapper: styled.div`
    margin-top: 100px;
  `,

  CartContents: styled.div`
    width: 400px;
  `,
};

export default Styled;
