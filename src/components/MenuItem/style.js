import styled from 'styled-components';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 24px;
    font-family: ${({ theme }) => theme.FONT.PRIMARY};
    color: ${({ theme }) => theme.WHITE};
    cursor: pointer;
  `,
};

export default Styled;
