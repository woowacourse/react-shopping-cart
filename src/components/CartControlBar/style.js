import styled from 'styled-components';

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  `,

  FieldSet: styled.div`
    width: 130px;
    display: flex;
    justify-content: space-between;
  `,
  DeleteButton: styled.button`
    padding: 12px 20px;
    border: 1px solid ${({ theme }) => theme.COLOR.GREY_100};
    cursor: pointer;
    background-color: ${({ theme }) => theme.COLOR.WHITE};
    font-size: 12px;
  `,
};

export default Styled;
