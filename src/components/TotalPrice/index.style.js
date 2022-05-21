import styled from 'styled-components';

const Styled = {
  TotalPrice: styled.div`
    width: 448px;
    height: 318px;
    border: 1px solid #cccccc;
  `,

  TitleContainer: styled.div`
    width: 448px;
    height: 81px;
    border: 1px solid #cccccc;
    display: flex;
    padding: 25px;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.5px;
  `,

  DetailContainer: styled.div`
    width: 448px;
    height: 237px;
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  Action: styled.p`
    font-weight: 400;
    font-size: 24px;
    line-height: 21px;
  `,

  PriceContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default Styled;
