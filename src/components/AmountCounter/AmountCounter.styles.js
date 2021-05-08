import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
`;

const Input = styled.input`
  margin: 0;
  padding: 0;
  border: 1px solid #dddddd;
  color: #333333;
  font-size: 24px;
  text-align: center;
  width: 70px;
  height: 60px;
  border-collapse: collapse;
  -moz-appearance: textfield;
  &:focus {
    outline: 0;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Nav = styled.div`
  width: 40px;
  height: 60px;
  border: 1px solid #dddddd;
  border-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:first-child {
    border-bottom: 1px solid #dddddd;
  }
`;

const ArrowContainer = styled.div`
  cursor: pointer;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  color: #333333;
  font-size: 13px;
  margin: 0;
  height: 50%;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowUp = styled.div`
  height: 0px;
  width: 0px;
  border: none;
  border-bottom: 5px solid #333333;
  border-right: 5px solid rgba(0, 0, 0, 0);
  border-left: 5px solid rgba(0, 0, 0, 0);
`;

const ArrowDown = styled.div`
  height: 0px;
  width: 0px;
  border: none;
  border-top: 5px solid #333333;
  border-left: 5px solid rgba(0, 0, 0, 0);
  border-right: 5px solid rgba(0, 0, 0, 0);
`;

export { Container, Input, Nav, ArrowContainer, ArrowUp, ArrowDown };
