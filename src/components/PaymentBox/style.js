import styled from 'styled-components';

const Styled = {
  Wrapper: styled.section`
    width: 338px;
    height: 218px;
    border: 1px solid ${({ theme }) => theme.COLOR.GREY_200};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  `,

  TitleBar: styled.div`
    width: 100%;
    padding: 15px 0;

    border-bottom: 2px solid ${({ theme }) => theme.COLOR.GREY_300};
  `,

  TitleText: styled.span`
    margin-left: 20px;
  `,

  Info: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
  `,

  Text: styled.p`
    line-height: 1.5px;
    border-bottom: 5px solid ${({ theme }) => theme.COLOR.RED_300};
  `,
};

export default Styled;
