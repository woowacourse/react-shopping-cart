import styled from '@emotion/styled';

const Root = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 72px;
  height: 60px;
  border: 1px solid ${(props) => props.theme.borderColor.lightGrey};
  border-right: 0;
  box-sizing: border-box;
  text-align: center;
  font-size: 24px;
  font-family: inherit;
  color: inherit;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowWrapper = styled.button`
  width: 42px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.borderColor.lightGrey};
  background: none;
  cursor: pointer;

  &:first-of-type {
    border-bottom: 0;
  }
`;

const ArrowUpImage = styled.img`
  width: 9px;
  height: 7px;
  user-select: none;
`;

const ArrowDownImage = styled(ArrowUpImage)`
  transform: rotate(180deg);
`;

export default { Root, Input, Control, ArrowWrapper, ArrowUpImage, ArrowDownImage };
