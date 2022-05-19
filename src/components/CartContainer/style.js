import styled from 'styled-components';

const Styled = {
  Title: styled.p`
    font-family: ${({ theme }) => theme.FONT.PRIMARY};
    font-size: 18px;
  `,

  Container: styled.section`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
  `,
};

export default Styled;
