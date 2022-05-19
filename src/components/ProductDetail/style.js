import styled from 'styled-components';

const Styled = {
  Image: styled.img`
    width: 350px;
    height: 350px;
  `,
  Info: styled.div`
    width: 380px;
    font-family: ${({ theme }) => theme.FONT.SECONDARY};
  `,
  Name: styled.div`
    margin: 10px 0 10px 15px;
    font-size: 18px;
    font-weight: 700;
  `,
  Price: styled.div`
    margin: 0 0 10px 15px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 400;
  `,

  Line: styled.hr`
    margin: 0;
  `,
};

export default Styled;
