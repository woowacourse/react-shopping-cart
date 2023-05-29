import styled from "styled-components";

const Styled = {
  Container: styled.div`
    display: flex;
    margin-top: 30px;
    width: 400px;
    height: 380px;
    flex-direction: column;

    border: 1px solid #dddddd;
  `,
  TopSection: styled.section`
    padding: 22px 30px;
    font-size: 24px;
    color: #333333;
    letter-spacing: 0.5px;
  `,
  Border: styled.hr`
    width: 100%;
    height: 2px;

    background-color: #dddddd;
  `,
  PriceSection: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: relative;
    width: 100%;
    height: 85%;

    font-size: 24px;
    letter-spacing: 0.5px;
    padding: 32px;
  `,
  PriceLine: styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 19px;
    justify-content: space-between;
  `,
  TextSpan: styled.span`
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.5px;
  `,
  PaymentSection: styled.section`
    display: flex;
    flex-direction: column;

    width: 100%;
  `,
  Button: styled.button`
    text-align: center;
    align-self: center;

    width: 100%;
    height: 50px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 0.5px;

    background-color: #333333;
  `,
};

export default Styled;
