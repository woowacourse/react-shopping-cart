import styled from '@emotion/styled';

const ArrowImage = styled.img`
  width: 9px;
  height: 7px;
  user-select: none;
`;

const Styled = {
  Root: styled.div`
    display: flex;
  `,

  Input: styled.input`
    width: 72px;
    height: 60px;
    border: 1px solid #dddddd;
    border-right: 0;
    box-sizing: border-box;
    text-align: center;
    font-size: 24px;
    font-family: inherit;
    color: inherit;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    outline: none;
  `,

  Control: styled.div`
    display: flex;
    flex-direction: column;
  `,

  ArrowWrapper: styled.button`
    width: 42px;
    height: 30px;
    border: 1px solid #dddddd;
    background: none;
    cursor: pointer;

    &:first-child {
      border-bottom: 0;
    }
  `,

  ArrowUpImage: styled(ArrowImage)``,

  ArrowDownImage: styled(ArrowImage)`
    transform: rotate(180deg);
  `,
};

export default Styled;
